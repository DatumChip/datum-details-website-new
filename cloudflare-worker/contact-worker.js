/* =========================================================================
   Datum Details — Cloudflare Worker: contact form handler
   -------------------------------------------------------------------------
   Receives POST submissions from the contact form, validates them, stores
   them in Cloudflare KV, and emails a notification via Resend.

   Setup (see BACKEND_BRIEF.md for full details):
     1. Workers & Pages > Create Worker, name it `datum-details-contact`
     2. Create a KV namespace `CONTACT_SUBMISSIONS`
     3. Bind it to the Worker as `SUBMISSIONS`
     4. Add env var `RESEND_API_KEY` (from resend.com)
     5. Deploy this script
   ========================================================================= */

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': 'https://datumdetails.com',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    // Basic validation
    const required = ['firstName', 'lastName', 'email', 'serviceType', 'contactMethod'];
    for (const field of required) {
      if (!data[field] || data[field].trim() === '') {
        return new Response(JSON.stringify({ error: `Missing required field: ${field}` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Build submission record
    const submission = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || '',
      serviceType: data.serviceType.trim(),
      message: data.message?.trim() || '',
      contactMethod: data.contactMethod.trim(),
    };

    // Store in KV (key = submission ID, also store an index by date)
    await env.SUBMISSIONS.put(
      `submission:${submission.id}`,
      JSON.stringify(submission),
      { expirationTtl: 60 * 60 * 24 * 365 } // 1 year
    );

    // Send email via Resend
    await sendNotificationEmail(submission, env.RESEND_API_KEY);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://datumdetails.com',
      },
    });
  },
};

async function sendNotificationEmail(submission, apiKey) {
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
View all submissions in Cloudflare KV: https://dash.cloudflare.com
  `.trim();

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Datum Details Website <noreply@datumdetails.com>',
      to: ['admin@datumdetails.com'],
      subject: `New Assessment Request — ${submission.firstName} ${submission.lastName}`,
      text: emailBody,
    }),
  });

  if (!response.ok) {
    // Log but don't fail the request — submission is already saved to KV
    console.error('Resend email failed:', await response.text());
  }
}
