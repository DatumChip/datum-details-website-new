/* =========================================================================
   Datum Details — Cloudflare Worker: contact form handler + admin viewer
   -------------------------------------------------------------------------
   POST /            → receives a form submission, stores it in KV, emails it.
   GET  /admin       → password-protected HTML table of all submissions.
   GET  /admin?format=csv → CSV download of all submissions.

   SETUP (Cloudflare dashboard — no CLI needed):
     1. Workers & Pages → KV → Create a namespace (e.g. "datum-details-submissions").
     2. Workers & Pages → Create → Worker, name it "datum-details-contact".
        Edit code → paste this file → Deploy.
     3. Worker → Settings → Bindings → add a KV Namespace binding:
          Variable name: SUBMISSIONS   → select the namespace from step 1.
     4. Worker → Settings → Variables and Secrets, add:
          RESEND_API_KEY   (Secret)   — from resend.com → API Keys
          FROM_EMAIL       (Text)     — e.g. "Datum Details Website <noreply@albertacornerstore.com>"
          TO_EMAIL         (Text)     — e.g. "admin@datumdetails.com" (comma-separate for several)
          ADMIN_PASSWORD   (Secret)   — password for the /admin viewer
     5. Copy the Worker URL (…workers.dev) into js/contact.js (WORKER_URL).
     6. View submissions at  https://<worker-url>/admin  (any username + ADMIN_PASSWORD).
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
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(request) });
    }

    // Admin viewer (HTML table / CSV) — password protected
    if (request.method === 'GET' && url.pathname === '/admin') {
      return handleAdmin(request, env, url);
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

    // Honeypot: real users never fill "company". Pretend success, drop silently.
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
    }

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
Submitted:         ${fmtDate(submission.timestamp)}

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

/* ----------------------------------------------------------- Admin viewer */

async function handleAdmin(request, env, url) {
  // Basic Auth: any username, password must equal ADMIN_PASSWORD.
  const expected = env.ADMIN_PASSWORD;
  if (!expected) {
    return new Response('Admin viewer not configured (set ADMIN_PASSWORD).', { status: 500 });
  }
  const auth = request.headers.get('Authorization') || '';
  const [scheme, encoded] = auth.split(' ');
  let ok = false;
  if (scheme === 'Basic' && encoded) {
    try {
      const pass = atob(encoded).split(':').slice(1).join(':');
      ok = pass === expected;
    } catch { ok = false; }
  }
  if (!ok) {
    return new Response('Authentication required.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Datum Details submissions"' },
    });
  }

  // Read every submission (paginated list).
  const items = [];
  let cursor;
  do {
    const res = await env.SUBMISSIONS.list({ prefix: 'submission:', cursor });
    for (const k of res.keys) {
      const v = await env.SUBMISSIONS.get(k.name);
      if (v) { try { items.push(JSON.parse(v)); } catch {} }
    }
    cursor = res.list_complete ? null : res.cursor;
  } while (cursor);

  items.sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)));

  if (url.searchParams.get('format') === 'csv') {
    return csvResponse(items);
  }
  return htmlResponse(items);
}

function csvResponse(items) {
  const cols = ['timestamp', 'firstName', 'lastName', 'email', 'phone', 'serviceType', 'contactMethod', 'message'];
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = [cols.join(',')];
  for (const it of items) rows.push(cols.map((c) => esc(it[c])).join(','));
  return new Response(rows.join('\r\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="datum-details-submissions.csv"',
    },
  });
}

function htmlResponse(items) {
  const rows = items.map((it) => `
    <tr>
      <td class="nowrap">${fmtDate(it.timestamp)}</td>
      <td>${esc(it.firstName)} ${esc(it.lastName)}</td>
      <td><a href="mailto:${esc(it.email)}">${esc(it.email)}</a></td>
      <td class="nowrap">${it.phone ? `<a href="tel:${esc(it.phone)}">${esc(it.phone)}</a>` : '—'}</td>
      <td>${esc(it.serviceType)}</td>
      <td>${esc(it.contactMethod)}</td>
      <td>${it.message ? esc(it.message) : '<span class="muted">—</span>'}</td>
    </tr>`).join('');

  const html = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>Datum Details — Submissions</title>
<style>
  :root { font-family: -apple-system, Segoe UI, Roboto, sans-serif; }
  body { margin: 0; background: #f4f3ef; color: #1a1a1a; }
  header { background: #1a1a1a; color: #f4f3ef; padding: 20px 28px; display: flex; align-items: baseline; gap: 16px; justify-content: space-between; flex-wrap: wrap; }
  header h1 { font-size: 1.15rem; font-weight: 600; margin: 0; letter-spacing: 0.02em; }
  header .count { color: #8fa882; font-size: 0.9rem; }
  header a { color: #8fa882; font-size: 0.9rem; text-decoration: none; border: 1px solid #8fa882; padding: 6px 14px; border-radius: 4px; }
  .wrap { padding: 24px 28px; overflow-x: auto; }
  table { border-collapse: collapse; width: 100%; background: #fff; font-size: 0.9rem; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  th, td { text-align: left; padding: 11px 14px; border-bottom: 1px solid #eceae4; vertical-align: top; }
  th { background: #3a3a38; color: #f4f3ef; font-weight: 500; position: sticky; top: 0; }
  tr:hover td { background: #faf9f6; }
  td.nowrap { white-space: nowrap; }
  td a { color: #4a5548; }
  .muted { color: #9a988f; }
  .empty { padding: 60px; text-align: center; color: #9a988f; }
</style></head><body>
<header>
  <h1>Datum Details — Form Submissions <span class="count">(${items.length})</span></h1>
  <a href="/admin?format=csv">Download CSV</a>
</header>
<div class="wrap">
${items.length ? `<table>
  <thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Prefers</th><th>Message</th></tr></thead>
  <tbody>${rows}</tbody>
</table>` : '<div class="empty">No submissions yet.</div>'}
</div>
</body></html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

function esc(v) {
  return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function fmtDate(ts) {
  try {
    return new Date(ts).toLocaleString('en-CA', { timeZone: 'America/Edmonton' });
  } catch {
    return ts;
  }
}
