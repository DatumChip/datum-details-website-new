/* =========================================================================
   Datum Details — contact.js
   Submits the contact form to the Cloudflare Worker (see BACKEND_BRIEF.md).
   ========================================================================= */
(function () {
  'use strict';

  // TODO: Replace with the deployed Cloudflare Worker URL.
  // e.g. 'https://datum-details-contact.YOUR_SUBDOMAIN.workers.dev'
  // or a custom route like 'https://datumdetails.com/api/contact'
  const WORKER_URL = 'REPLACE_WITH_CLOUDFLARE_WORKER_URL';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = document.getElementById('form-status');

  async function submitForm(event) {
    event.preventDefault();

    // Honeypot: a real user never sees or fills the "company" field. If it has
    // a value, treat it as a bot — show success but send nothing.
    if (form.company && form.company.value.trim() !== '') {
      statusEl.textContent = "Thanks — we'll be in touch shortly.";
      statusEl.className = 'form-status success';
      form.reset();
      return;
    }

    // Native validation (the form uses `novalidate` so we trigger it manually)
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    const payload = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value,
      serviceType: form.serviceType.value,
      message: form.message.value,
      contactMethod: form.contactMethod.value,
    };

    if (WORKER_URL === 'REPLACE_WITH_CLOUDFLARE_WORKER_URL') {
      console.warn('contact.js: WORKER_URL is not configured yet.');
      statusEl.textContent = 'Form is not connected yet — please call us at (587) 843-6101.';
      statusEl.className = 'form-status error';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Book My Assessment';
      return;
    }

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        statusEl.textContent = "Thanks — we'll be in touch shortly.";
        statusEl.className = 'form-status success';
        form.reset();
      } else {
        let message = 'Something went wrong. Please try calling us directly.';
        try {
          const err = await response.json();
          if (err && err.error) message = err.error;
        } catch (_) { /* response had no JSON body */ }
        statusEl.textContent = message;
        statusEl.className = 'form-status error';
      }
    } catch (_) {
      statusEl.textContent = 'Could not send — please try calling us at (587) 843-6101.';
      statusEl.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Book My Assessment';
    }
  }

  form.addEventListener('submit', submitForm);
})();
