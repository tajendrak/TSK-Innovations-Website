// assets/js/main.js
// Minimal behavior: year, nav toggle, smooth scroll, reveal
document.addEventListener('DOMContentLoaded', function () {
  // set current year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // nav toggle
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // smooth internal links
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href === '#') return;
    var id = href.slice(1);
    var el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('show'); });
  }

  // close nav with Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
    }
  });
});


