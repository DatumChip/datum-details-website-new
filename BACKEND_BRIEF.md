# Datum Details — Backend Brief

This document covers the contact form backend: a Cloudflare Worker that receives form submissions, stores them, and sends email notifications.

---

## Overview

The contact form on `/contact` posts to a Cloudflare Worker. The Worker:
1. Validates the incoming data
2. Stores the submission to Cloudflare KV
3. Sends an email notification to the team via Resend

No database. No server. Fully serverless and free at this volume.

---

## Stack

| Layer | Tool |
|-------|------|
| Form handler | Cloudflare Worker (JavaScript) |
| Storage | Cloudflare KV |
| Email | Resend (resend.com) — free tier covers this easily |
| Domain | Already on Cloudflare |

---

## Cloudflare Worker

### Setup steps

1. In the Cloudflare dashboard, go to Workers & Pages > Create Worker
2. Name it `datum-details-contact`
3. Create a KV namespace called `CONTACT_SUBMISSIONS`
4. Bind the KV namespace to the worker (Settings > Variables > KV Namespace Bindings, variable name: `SUBMISSIONS`)
5. Add environment variable: `RESEND_API_KEY` (get this from resend.com after creating a free account)
6. Deploy the worker script below

### Worker script

```javascript
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
```

---

## Frontend form integration

The contact form in `contact.html` should submit via JavaScript (not a native form POST) so we can handle success/error states without a page reload.

```javascript
async function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector('[type="submit"]');
  const statusEl = document.getElementById('form-status');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  const payload = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    phone: form.phone.value,
    serviceType: form.serviceType.value,
    message: form.message.value,
    contactMethod: form.contactMethod.value,
  };

  try {
    const response = await fetch('https://datum-details-contact.YOUR_SUBDOMAIN.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      statusEl.textContent = "Thanks — we'll be in touch shortly.";
      statusEl.className = 'form-status success';
      form.reset();
    } else {
      const err = await response.json();
      statusEl.textContent = err.error || 'Something went wrong. Please try calling us directly.';
      statusEl.className = 'form-status error';
    }
  } catch {
    statusEl.textContent = 'Could not send — please try calling us at (587) 843-6101.';
    statusEl.className = 'form-status error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'BOOK MY ASSESSMENT';
  }
}

document.getElementById('contact-form').addEventListener('submit', submitForm);
```

Replace `YOUR_SUBDOMAIN` with the actual Workers subdomain once deployed. This URL can also be set as a custom route like `datumdetails.com/api/contact` using Cloudflare's route matching.

---

## Resend setup

1. Create a free account at resend.com
2. Add `datumdetails.com` as a verified sending domain (requires adding a DNS TXT record in Cloudflare — takes 2 minutes)
3. Generate an API key
4. Add the API key as an environment variable on the Worker (`RESEND_API_KEY`)

Free tier: 3,000 emails/month, 100/day. More than enough for a contact form.

---

## Viewing stored submissions

Submissions are stored in Cloudflare KV. To view them:
- Cloudflare Dashboard > Workers & Pages > KV > `CONTACT_SUBMISSIONS`
- Or build a simple admin script to list them (out of scope for now)

Each record is stored with key `submission:{uuid}` and contains the full JSON.

---

## Environment variables needed on the Worker

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | From resend.com dashboard |

KV binding:
| Binding name | KV namespace |
|--------------|--------------|
| `SUBMISSIONS` | `CONTACT_SUBMISSIONS` |

---

## CORS note

The worker allows requests from `https://datumdetails.com` only. During local development, you'll need to either:
- Temporarily add `http://localhost:5173` (or whatever port Vite uses) to the allowed origins, or
- Use `wrangler dev` to run the worker locally alongside the frontend
