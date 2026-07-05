/* ============================================================
   PROJECTS PAGE — stats, category filter pills, and grouped
   rendering (data-driven from data.js / cards.js)
   ============================================================ */

(function renderStats() {
  document.getElementById('project-stats').innerHTML = `
    <div class="page-stat"><span class="page-stat-num">${PROJECTS.length}</span><span class="page-stat-label">Total Projects</span></div>
  `;
})();

const pillsEl = document.getElementById('project-filter-pills');
let activeCat = 'all';
function renderPills() {
  const counts = {};
  PROJECTS.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
  let html = `<div class="cat-pill ${activeCat === 'all' ? 'active' : ''}" data-cat="all">✨ All (${PROJECTS.length})</div>`;
  PROJECT_CATEGORIES.forEach(cat => {
    if (!counts[cat.id]) return;
    html += `<div class="cat-pill ${activeCat === cat.id ? 'active' : ''}" data-cat="${cat.id}">${cat.icon} ${cat.label} (${counts[cat.id]})</div>`;
  });
  pillsEl.innerHTML = html;
  pillsEl.querySelectorAll('.cat-pill').forEach(p => {
    p.addEventListener('click', () => {
      activeCat = p.dataset.cat;
      renderPills();
      applyFilter();
    });
  });
}
renderPills();

renderGrouped('projects-grouped', PROJECTS, PROJECT_CATEGORIES, projectCardHTML);

function applyFilter() {
  document.querySelectorAll('.category-block').forEach(block => {
    const cat = block.dataset.catBlock;
    block.hidden = !(activeCat === 'all' || activeCat === cat);
  });
}
