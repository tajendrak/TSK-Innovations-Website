/*
  TSK Innovations – UI script
  - Mobile menu
  - Smooth scrolling
  - Header shadow on scroll
  - Scroll spy (active nav link)
  - Reveal-on-scroll (reduced-motion aware)
  - WhatsApp link utility (optional data-wa attribute)
*/

// ============ Config (edit quickly here) ============
const CONFIG = {
  whatsappNumber: "601151398010", // Malaysia format, no '+'
  prefill: "Hi TSK Innovations! I'm interested in your services."
};

// Build a wa.me link with encoded text
function buildWaLink(customText) {
  const text = encodeURIComponent(customText || CONFIG.prefill);
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
}

// ============ Mobile menu ============
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // Close menu on link click (mobile)
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ============ Smooth scrolling ============
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href");
    if (id && id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// ============ Header shadow on scroll ============
const header = document.querySelector(".site-header");
const headerShadowToggle = () => {
  if (!header) return;
  const scrolled = window.scrollY > 2;
  header.classList.toggle("scrolled", scrolled);
};
headerShadowToggle();
window.addEventListener("scroll", headerShadowToggle, { passive: true });

// ============ Scroll Spy (active nav link) ============
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a[href^='#']");

const setActiveLink = (id) => {
  navLinks.forEach(l => l.classList.remove("active"));
  const active = document.querySelector(`.nav a[href="#${id}"]`);
  active?.classList.add("active");
};

const spyObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
);

sections.forEach(sec => spyObserver.observe(sec));

// ============ Reveal on scroll (reduced-motion aware) ============
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  const revealObserver = new IntersectionObserver(
    entries => entries.forEach(ent => {
      if (ent.isIntersecting) ent.target.classList.add("in");
    }),
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
} else {
  // If reduced motion, show everything immediately
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
}

// ============ WhatsApp link hydration ============
// 1) Any element with [data-wa] will be converted to wa.me with its custom text
document.querySelectorAll("[data-wa]").forEach(el => {
  const txt = el.getAttribute("data-wa") || CONFIG.prefill;
  if (el.tagName.toLowerCase() === "a") {
    el.setAttribute("href", buildWaLink(txt));
  } else {
    el.addEventListener("click", () => window.open(buildWaLink(txt), "_blank"));
  }
});

// 2) Ensure any .btn-whatsapp without href gets one
document.querySelectorAll("a.btn-whatsapp:not([href])").forEach(a => {
  a.setAttribute("href", buildWaLink());
});

// 3) Optional: replace generic placeholders if author forgot
document.querySelectorAll("a[href*='wa.me/']").forEach(a => {
  // If a wa.me link is missing number, hydrate it
  const href = a.getAttribute("href") || "";
  if (!href.includes(CONFIG.whatsappNumber)) {
    a.setAttribute("href", buildWaLink());
  }
});
