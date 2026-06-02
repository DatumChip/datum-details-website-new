/* =========================================================================
   Datum Details — main.js
   Shared behaviour: scroll-aware nav, mobile menu, scroll fade-ins.
   ========================================================================= */
(function () {
  'use strict';

  /* ---- Scroll-aware nav ------------------------------------------------ */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile menu ----------------------------------------------------- */
  var toggle = document.querySelector('.nav__toggle');
  var body = document.body;
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close menu when a link inside the overlay is tapped
    document.querySelectorAll('.nav__mobile a').forEach(function (a) {
      a.addEventListener('click', function () {
        body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) {
        body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Scroll fade-ins ------------------------------------------------- */
  var faders = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && faders.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    faders.forEach(function (el) { io.observe(el); });
  } else {
    // No IO support — just show everything
    faders.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
