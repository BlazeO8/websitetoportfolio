/* ============================================================
   COMMON — nav, theme toggle, hamburger, scroll-reveal for
   static content. Shared by index.html, certificates.html,
   projects.html.
   ============================================================ */

/* THEME TOGGLE */
const toggle = document.getElementById('theme-toggle');
let isDark = document.documentElement.dataset.theme !== 'light';
if (toggle) {
  toggle.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    toggle.textContent = isDark ? '🌙' : '☀️';
  });
}

/* HAMBURGER */
const ham = document.getElementById('hamburger');
const nav = document.getElementById('nav-links');
if (ham && nav) {
  ham.addEventListener('click', () => {
    nav.classList.toggle('open');
    const spans = ham.querySelectorAll('span');
    if (nav.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));
}

/* SCROLL REVEAL for content already in the HTML on page load */
const staticReveals = document.querySelectorAll('.reveal');
const staticObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      const bar = e.target.querySelector('.skill-bar');
      if (bar) {
        const level = e.target.dataset.level || '70';
        setTimeout(() => { bar.style.width = level + '%'; }, 200);
      }
    }
  });
}, { threshold: 0.12 });
staticReveals.forEach(el => staticObserver.observe(el));
