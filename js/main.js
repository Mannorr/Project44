/* ═══════════════════════════════════════════════════════════
   PROJECT44 — main.js
   Mobile navigation + contact form handling + year stamp
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Mobile Navigation Toggle ─── */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      const isOpen = toggle.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─── Contact Form Handler (Formspree AJAX) ─── */
  const form = document.querySelector('#contact-form');
  if (form) {
    const messageBox = form.querySelector('.form-message');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        showMessage('Please fill out all required fields.', 'error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }

      const data = new FormData(form);
      const endpoint = form.getAttribute('action');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      showMessage('', '');

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          showMessage("Thank you! Your message has been sent — we'll be in touch soon.", 'success');
          form.reset();
        } else {
          const result = await response.json().catch(function () { return null; });
          const errMsg = result && result.errors
            ? result.errors.map(function (er) { return er.message; }).join(', ')
            : 'Something went wrong. Please email us directly at theproject44nigeria@gmail.com.';
          showMessage(errMsg, 'error');
        }
      } catch (err) {
        showMessage('Network error. Please email us directly at theproject44nigeria@gmail.com.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });

    function showMessage(text, type) {
      if (!messageBox) return;
      messageBox.textContent = text;
      messageBox.className = 'form-message' + (type ? ' ' + type : '');
      if (type === 'success') {
        setTimeout(function () { messageBox.className = 'form-message'; messageBox.textContent = ''; }, 10000);
      }
    }
  }

  /* ─── Footer year stamp ─── */
  const yearSpan = document.querySelector('#current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* ─── Scroll Reveal (IntersectionObserver) ─── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ─── Counter animation for hero stats ─── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
        countIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countIO.observe(el); });
  }

  /* ─── Navbar shadow on scroll ─── */
  const nav = document.querySelector('.navbar');
  if (nav) {
    const onScroll = function () {
      if (window.scrollY > 12) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── Mark active nav link based on current page ─── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
