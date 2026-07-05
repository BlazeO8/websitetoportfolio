/* ============================================================
   CARD RENDERING — shared by index.html, pages/certificates.html,
   pages/projects.html. Reads from data.js (CERTIFICATES / PROJECTS).

   window.ASSET_BASE must be set (before this script loads) to the
   relative path back to the project root, e.g. '' at root or
   '../' from inside /pages. This keeps every path in data.js
   root-relative on paper while still resolving correctly no
   matter how deep the HTML file lives — important for GitHub
   Pages project sites served under a /repo-name/ subpath.
   ============================================================ */
const BASE = window.ASSET_BASE || '';

function certCardHTML(cert, delayClass) {
  if (cert.status === 'in-progress') {
    return `
    <div class="cert-card cert-locked reveal ${delayClass || ''}" data-title="${cert.title}" data-category="${cert.category}">
      <div class="cert-thumb cert-thumb-placeholder">
        <span>🔒</span>
      </div>
      <div class="cert-body">
        <div class="cert-title">${cert.title}</div>
        <div class="cert-issuer">${cert.issuer}</div>
        <div class="cert-badge cert-badge-progress">⏳ In Progress</div>
        <div class="cert-links">
          <a href="${cert.courseUrl}" target="_blank" rel="noopener noreferrer" class="cert-btn">Start Course ↗</a>
        </div>
      </div>
    </div>`;
  }
  return `
    <div class="cert-card reveal ${delayClass || ''}" data-title="${cert.title}" data-category="${cert.category}">
      <img src="${BASE}${cert.thumb}" alt="${cert.title}" class="cert-thumb-img" loading="lazy">
      <div class="cert-body">
        <div class="cert-title">${cert.title}</div>
        <div class="cert-issuer">${cert.issuer}</div>
        <div class="cert-badge">✓ Completed</div>
        <div class="cert-links">
          <a href="${BASE}${cert.pdf}" target="_blank" rel="noopener noreferrer" class="cert-btn">View</a>
          <a href="${BASE}${cert.pdf}" download class="cert-btn download">Download</a>
        </div>
      </div>
    </div>`;
}

function projectCardHTML(proj, delayClass) {
  const linkIcon = proj.playable
    ? `<a href="#" onclick="document.getElementById('gameModal').style.display='flex'; return false;" class="project-link-icon">↗</a>`
    : proj.link
      ? `<a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="project-link-icon">↗</a>`
      : `<span class="project-link-icon">↗</span>`;
  const titleHTML = (proj.link && !proj.playable)
    ? `<a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="project-title project-title-link">${proj.title}</a>`
    : `<div class="project-title">${proj.title}</div>`;
  return `
    <div class="project-card reveal ${delayClass || ''}" style="--pc-grad:${proj.grad}" data-category="${proj.category}">
      <div class="project-header">
        <div class="project-icon">${proj.icon}</div>
        ${linkIcon}
      </div>
      ${titleHTML}
      <div class="project-desc">${proj.desc}</div>
      <div class="project-tags">
        ${proj.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
    </div>`;
}

const DELAYS = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4'];

// Renders a flat grid of featured cards into a container (used on index.html)
function renderFeatured(containerId, items, cardFn, limit) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const list = items.filter(i => i.featured).slice(0, limit || 4);
  el.innerHTML = list.map((item, i) => cardFn(item, DELAYS[i % DELAYS.length])).join('');
  observeReveals(el);
}

// Renders items grouped under category section headers (used on certificates.html / projects.html)
function renderGrouped(containerId, items, categories, cardFn) {
  const el = document.getElementById(containerId);
  if (!el) return;
  let html = '';
  categories.forEach(cat => {
    const group = items.filter(i => i.category === cat.id);
    if (!group.length) return;
    html += `
      <div class="category-block" data-cat-block="${cat.id}">
        <div class="category-header reveal">
          <span class="category-icon">${cat.icon}</span>
          <h3>${cat.label}</h3>
          <span class="category-count">${group.length}</span>
        </div>
        <div class="cert-grid-inner projects-grid-inner">
          ${group.map((item, i) => cardFn(item, DELAYS[i % DELAYS.length])).join('')}
        </div>
      </div>`;
  });
  el.innerHTML = html;
  observeReveals(el);
}

function observeReveals(root) {
  const reveals = root.querySelectorAll('.reveal');
  if (!window._revealObserver) {
    window._revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
  }
  reveals.forEach(el => window._revealObserver.observe(el));
}
