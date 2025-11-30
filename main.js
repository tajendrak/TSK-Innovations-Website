// assets/js/main.js

// Set year
document.addEventListener('DOMContentLoaded', function () {
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Smooth scroll for internal links
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    // allow default for href="#"
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      // close nav on mobile after click
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.15});
    revealEls.forEach(el => io.observe(el));
  } else {
    // fallback: show all
    revealEls.forEach(el => el.classList.add('show'));
  }

  // Close mobile nav with Escape
  document.addEventListener('keydown', (e) => {
    const navOpen = nav && nav.classList.contains('open');
    if (e.key === 'Escape' && navOpen) {
      nav.classList.remove('open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      if (navToggle) navToggle.focus();
    }
  });

  // Respect reduced motion
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (media.matches) {
    try { document.documentElement.style.scrollBehavior = 'auto'; } catch(e){}
  }
});



