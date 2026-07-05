/* ============================================================
   PAC-MAN AMBIENT BACKGROUND — a purely decorative, always-
   autoplaying Pac-Man "attract mode" that loops behind the
   whole site. Non-interactive (pointer-events:none), subtle
   opacity so it never fights with readability.
   Shared across index.html, pages/certificates.html, pages/projects.html.
   ============================================================ */
(function () {
  const canvas = document.getElementById('pacman-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, cellSize, cols, rows, elevatorCol, path, totalLen, segLens, cumLens;
  let dotsEaten = [];
  let travelled = 0;
  const SPEED = 1.6; // px per frame

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildMaze();
  }

  function buildMaze() {
    cellSize = Math.max(46, Math.min(64, Math.floor(W / 18)));
    cols = Math.max(4, Math.floor((W - cellSize * 3) / cellSize));
    rows = Math.max(3, Math.floor((H - cellSize * 3) / cellSize));
    elevatorCol = cols + 1;

    const offsetX = (W - (elevatorCol + 1) * cellSize) / 2 + cellSize / 2;
    const offsetY = (H - rows * cellSize) / 2 + cellSize / 2;

    const grid = [];
    for (let r = 0; r < rows; r++) {
      if (r % 2 === 0) { for (let c = 0; c <= cols; c++) grid.push({ c, r }); }
      else { for (let c = cols; c >= 0; c--) grid.push({ c, r }); }
    }
    // elevator lane back up to the start, forming one continuous loop
    const lastRow = rows - 1;
    grid.push({ c: elevatorCol, r: lastRow });
    for (let r = lastRow - 1; r >= 0; r--) grid.push({ c: elevatorCol, r });

    path = grid.map(p => ({ x: offsetX + p.c * cellSize, y: offsetY + p.r * cellSize }));

    segLens = [];
    cumLens = [0];
    for (let i = 0; i < path.length; i++) {
      const a = path[i], b = path[(i + 1) % path.length];
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      segLens.push(len);
      cumLens.push(cumLens[i] + len);
    }
    totalLen = cumLens[cumLens.length - 1];
    dotsEaten = new Array(path.length).fill(false);
    travelled = travelled % totalLen || 0;
  }

  // Returns {x,y,angle,idx} for a given distance travelled along the loop
  function pointAtDistance(dist) {
    dist = ((dist % totalLen) + totalLen) % totalLen;
    // binary search cumLens
    let lo = 0, hi = segLens.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cumLens[mid + 1] < dist) lo = mid + 1; else hi = mid;
    }
    const i = lo;
    const segStart = cumLens[i];
    const segLen = segLens[i] || 1;
    const t = (dist - segStart) / segLen;
    const a = path[i], b = path[(i + 1) % path.length];
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      angle: Math.atan2(b.y - a.y, b.x - a.x),
      idx: i
    };
  }

  function drawDots() {
    ctx.save();
    for (let i = 0; i < path.length; i++) {
      if (dotsEaten[i]) continue;
      // skip elevator-lane dots for a cleaner look except every other one
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,215,120,0.35)';
      ctx.arc(path[i].x, path[i].y, 2.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawPacman(pos, mouthT) {
    const mouth = (Math.sin(mouthT) * 0.5 + 0.5) * 0.28 * Math.PI; // 0..~0.28*PI
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(pos.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, cellSize * 0.32, mouth, Math.PI * 2 - mouth);
    ctx.closePath();
    ctx.fillStyle = 'rgba(250,204,21,0.55)';
    ctx.shadowColor = 'rgba(250,204,21,0.4)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();
  }

  function drawGhost(pos, color, bob) {
    const r = cellSize * 0.3;
    ctx.save();
    ctx.translate(pos.x, pos.y + Math.sin(bob) * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.42;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    // dome head
    ctx.beginPath();
    ctx.arc(0, 0, r, Math.PI, 0);
    ctx.lineTo(r, r * 0.7);
    // wavy skirt
    const waves = 4;
    for (let i = 0; i < waves; i++) {
      const x1 = r - (i * (2 * r) / waves);
      const x2 = r - ((i + 0.5) * (2 * r) / waves);
      ctx.quadraticCurveTo(x1, r * 1.15, x2, r * 0.7);
    }
    ctx.lineTo(-r, r * 0.7);
    ctx.closePath();
    ctx.fill();
    // eyes
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(-r * 0.35, -r * 0.1, r * 0.28, 0, Math.PI * 2);
    ctx.arc(r * 0.35, -r * 0.1, r * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath();
    ctx.arc(-r * 0.3, -r * 0.1, r * 0.13, 0, Math.PI * 2);
    ctx.arc(r * 0.4, -r * 0.1, r * 0.13, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const GHOSTS = [
    { offset: 260, color: '#ff4d6d' },
    { offset: 440, color: '#ff9edb' },
    { offset: 620, color: '#5ee7ff' },
  ];

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    travelled += SPEED;
    const pac = pointAtDistance(travelled);
    // eat dots near/behind current position
    if (!dotsEaten[pac.idx]) dotsEaten[pac.idx] = true;
    if (dotsEaten.every(Boolean)) dotsEaten.fill(false);

    drawDots();
    GHOSTS.forEach((g, i) => {
      const gp = pointAtDistance(travelled - g.offset);
      drawGhost(gp, g.color, frame * 0.06 + i * 2);
    });
    drawPacman(pac, frame * 0.18);

    requestAnimationFrame(animate);
  }

  resize();
  animate();
  window.addEventListener('resize', () => { resize(); });
})();
