/* =========================================================================
   Datum Details — Cloudflare Worker: contact form handler
   -------------------------------------------------------------------------
   Receives POST submissions from the contact form, validates them, stores
   them in Cloudflare KV, and emails a notification via Resend.

   SETUP (Cloudflare dashboard — no CLI needed):
     1. Workers & Pages → KV → Create a namespace (e.g. "datum-details-submissions").
     2. Workers & Pages → Create → Worker, name it "datum-details-contact".
        Edit code → paste this file → Deploy.
     3. Worker → Settings → Bindings → add a KV Namespace binding:
          Variable name: SUBMISSIONS   → select the namespace from step 1.
     4. Worker → Settings → Variables and Secrets, add:
          RESEND_API_KEY   (Secret)   — from resend.com → API Keys
          FROM_EMAIL       (Text)     — e.g. "Datum Details <noreply@datumdetails.com>"
                                        (the domain must be verified in Resend)
          TO_EMAIL         (Text)     — e.g. "admin@datumdetails.com"
     5. Copy the Worker URL (…workers.dev) into js/contact.js (WORKER_URL).
   ========================================================================= */

const ALLOWED_ORIGINS = [
  'https://datumdetails.com',
  'https://www.datumdetails.com',
];

function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function json(body, status, request) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
  });
}

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(request) });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, request);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400, request);
    }

    // Honeypot: real users never fill "company". If present, pretend success
    // and silently drop (don't store, don't email).
    if (data.company && String(data.company).trim() !== '') {
      return json({ success: true }, 200, request);
    }

    // Validate required fields
    const required = ['firstName', 'lastName', 'email', 'serviceType', 'contactMethod'];
    for (const field of required) {
      if (!data[field] || String(data[field]).trim() === '') {
        return json({ error: `Missing required field: ${field}` }, 400, request);
      }
    }

    // Build submission record
    const submission = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      firstName: String(data.firstName).trim(),
      lastName: String(data.lastName).trim(),
      email: String(data.email).trim().toLowerCase(),
      phone: data.phone ? String(data.phone).trim() : '',
      serviceType: String(data.serviceType).trim(),
      message: data.message ? String(data.message).trim() : '',
      contactMethod: String(data.contactMethod).trim(),
    };

    // Store in KV. Key is time-prefixed so submissions list chronologically;
    // metadata gives an at-a-glance view in the dashboard.
    try {
      await env.SUBMISSIONS.put(
        `submission:${submission.timestamp}:${submission.id}`,
        JSON.stringify(submission),
        {
          expirationTtl: 60 * 60 * 24 * 365, // 1 year
          metadata: {
            name: `${submission.firstName} ${submission.lastName}`,
            email: submission.email,
            serviceType: submission.serviceType,
          },
        }
      );
    } catch (err) {
      console.error('KV store failed:', err);
      // Continue — we still try to email so the lead isn't lost.
    }

    // Email notification via Resend (failure is logged, not fatal).
    try {
      await sendNotificationEmail(submission, env);
    } catch (err) {
      console.error('Email send threw:', err);
    }

    return json({ success: true }, 200, request);
  },
};

async function sendNotificationEmail(submission, env) {
  const from = env.FROM_EMAIL || 'Datum Details Website <noreply@datumdetails.com>';
  // TO_EMAIL can be a single address or a comma-separated list of recipients.
  const to = (env.TO_EMAIL || 'admin@datumdetails.com')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const emailBody = `
New contact form submission from datumdetails.com

Name:              ${submission.firstName} ${submission.lastName}
Email:             ${submission.email}
Phone:             ${submission.phone || 'Not provided'}
Service Interest:  ${submission.serviceType}
Preferred Contact: ${submission.contactMethod}
Submitted:         ${new Date(submission.timestamp).toLocaleString('en-CA', { timeZone: 'America/Edmonton' })}

Message:
${submission.message || '(No message provided)'}

---
Submission ID: ${submission.id}
  `.trim();

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: submission.email,
      subject: `New Assessment Request — ${submission.firstName} ${submission.lastName}`,
      text: emailBody,
    }),
  });

  if (!response.ok) {
    console.error('Resend email failed:', response.status, await response.text());
  }
}
