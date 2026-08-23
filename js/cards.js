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
          <button type="button" onclick="openCertModal('${BASE}${cert.thumb}', '${cert.title.replace(/'/g, "\\'")}')" class="cert-btn">View</button>
          <a href="${BASE}${cert.pdf}" download class="cert-btn download">Download</a>
        </div>
      </div>
    </div>`;
}

// Certificate image lightbox — shows the cert thumbnail image inline instead
// of opening the PDF in a new browser tab. Supports scroll-to-zoom,
// double-click zoom, drag-to-pan when zoomed, and +/- buttons.
let certZoom = 1, certPanX = 0, certPanY = 0;
let certDragging = false, certDragStartX = 0, certDragStartY = 0;
const CERT_ZOOM_MIN = 1, CERT_ZOOM_MAX = 4, CERT_ZOOM_STEP = 0.25;

function openCertModal(src, title) {
  let modal = document.getElementById('certModal');
  if (!modal) return;
  document.getElementById('certModalImg').src = src;
  document.getElementById('certModalImg').alt = title || 'Certificate';
  document.getElementById('certModalTitle').textContent = title || '';
  certZoom = 1; certPanX = 0; certPanY = 0;
  applyCertTransform();
  // rAF twice so the browser commits the "closed" state first, then
  // transitions into "open" — this is what makes it animate in
  // instead of just snapping to visible.
  requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('open')));
}
function closeCertModal() {
  const modal = document.getElementById('certModal');
  if (modal) modal.classList.remove('open');
}
function applyCertTransform() {
  const img = document.getElementById('certModalImg');
  if (!img) return;
  img.style.transform = `translate(${certPanX}px, ${certPanY}px) scale(${certZoom})`;
  img.classList.toggle('zoomed', certZoom > 1);
  const level = document.getElementById('certZoomLevel');
  if (level) level.textContent = Math.round(certZoom * 100) + '%';
}
function certClampPan() {
  if (certZoom <= 1) { certPanX = 0; certPanY = 0; }
}
function certZoomIn() {
  certZoom = Math.min(CERT_ZOOM_MAX, +(certZoom + CERT_ZOOM_STEP).toFixed(2));
  certClampPan(); applyCertTransform();
}
function certZoomOut() {
  certZoom = Math.max(CERT_ZOOM_MIN, +(certZoom - CERT_ZOOM_STEP).toFixed(2));
  certClampPan(); applyCertTransform();
}
function certZoomReset() {
  certZoom = 1; certPanX = 0; certPanY = 0; applyCertTransform();
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCertModal();
  if (e.key === '+' || e.key === '=') certZoomIn();
  if (e.key === '-') certZoomOut();
});

(function setupCertZoomInteractions() {
  document.addEventListener('DOMContentLoaded', () => {
    const img = document.getElementById('certModalImg');
    const wrap = document.getElementById('certModalImgWrap');
    if (!img || !wrap) return;

    wrap.addEventListener('wheel', (e) => {
      const modal = document.getElementById('certModal');
      if (!modal || !modal.classList.contains('open')) return;
      e.preventDefault();
      if (e.deltaY < 0) certZoomIn(); else certZoomOut();
    }, { passive: false });

    img.addEventListener('dblclick', () => {
      if (certZoom > 1) certZoomReset();
      else { certZoom = 2; applyCertTransform(); }
    });

    img.addEventListener('mousedown', (e) => {
      if (certZoom <= 1) return;
      certDragging = true;
      certDragStartX = e.clientX - certPanX;
      certDragStartY = e.clientY - certPanY;
      img.classList.add('dragging');
    });
    window.addEventListener('mousemove', (e) => {
      if (!certDragging) return;
      certPanX = e.clientX - certDragStartX;
      certPanY = e.clientY - certDragStartY;
      applyCertTransform();
    });
    window.addEventListener('mouseup', () => {
      certDragging = false;
      img.classList.remove('dragging');
    });

    // Basic touch support: pinch to zoom, drag to pan
    let touchStartDist = 0, touchStartZoom = 1;
    wrap.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        touchStartZoom = certZoom;
      } else if (e.touches.length === 1 && certZoom > 1) {
        certDragging = true;
        certDragStartX = e.touches[0].clientX - certPanX;
        certDragStartY = e.touches[0].clientY - certPanY;
      }
    }, { passive: true });
    wrap.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        certZoom = Math.min(CERT_ZOOM_MAX, Math.max(CERT_ZOOM_MIN, touchStartZoom * (dist / touchStartDist)));
        certClampPan(); applyCertTransform();
      } else if (e.touches.length === 1 && certDragging) {
        certPanX = e.touches[0].clientX - certDragStartX;
        certPanY = e.touches[0].clientY - certDragStartY;
        applyCertTransform();
      }
    }, { passive: false });
    wrap.addEventListener('touchend', () => { certDragging = false; });
  });
})();

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
