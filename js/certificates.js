/* ============================================================
   CERTIFICATES PAGE — stats, category filter pills, search,
   and grouped rendering (data-driven from data.js / cards.js)
   ============================================================ */

// Stats
(function renderStats() {
  const total = CERTIFICATES.length;
  const completed = CERTIFICATES.filter(c => c.status === 'completed').length;
  const inProgress = total - completed;
  document.getElementById('cert-stats').innerHTML = `
    <div class="page-stat"><span class="page-stat-num">${completed}</span><span class="page-stat-label">Completed</span></div>
    <div class="page-stat"><span class="page-stat-num">${inProgress}</span><span class="page-stat-label">In Progress</span></div>
    <div class="page-stat"><span class="page-stat-num">${total}</span><span class="page-stat-label">Total</span></div>
  `;
})();

// Filter pills
const pillsEl = document.getElementById('cert-filter-pills');
let activeCat = 'all';
function renderPills() {
  const counts = {};
  CERTIFICATES.forEach(c => { counts[c.category] = (counts[c.category] || 0) + 1; });
  let html = `<div class="cat-pill ${activeCat === 'all' ? 'active' : ''}" data-cat="all">✨ All (${CERTIFICATES.length})</div>`;
  CERT_CATEGORIES.forEach(cat => {
    if (!counts[cat.id]) return;
    html += `<div class="cat-pill ${activeCat === cat.id ? 'active' : ''}" data-cat="${cat.id}">${cat.icon} ${cat.label} (${counts[cat.id]})</div>`;
  });
  pillsEl.innerHTML = html;
  pillsEl.querySelectorAll('.cat-pill').forEach(p => {
    p.addEventListener('click', () => {
      activeCat = p.dataset.cat;
      renderPills();
      applyFilters();
    });
  });
}
renderPills();

// Grouped render
renderGrouped('certs-grouped', CERTIFICATES, CERT_CATEGORIES, certCardHTML);

// Search + category filter combined
function applyFilters() {
  const q = document.getElementById('cert-search').value.toLowerCase().trim();
  document.querySelectorAll('.category-block').forEach(block => {
    const cat = block.dataset.catBlock;
    const catMatches = activeCat === 'all' || activeCat === cat;
    let visibleCount = 0;
    block.querySelectorAll('.cert-card').forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const show = catMatches && (!q || title.includes(q));
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });
    block.hidden = visibleCount === 0;
  });
}

document.getElementById('cert-search').addEventListener('input', applyFilters);
