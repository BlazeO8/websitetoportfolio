/* ============================================================
   3D-STYLE BACKGROUND — perspective grid + depth-layered particles
   Shared across index.html, certificates.html, projects.html
   ============================================================ */
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], gridOffset = 0, mouseX = 0.5, mouseY = 0.5;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.depth = Math.random(); // 0 = far, 1 = near
      this.size = 0.4 + this.depth * 1.6;
      this.vx = (Math.random() - 0.5) * (0.08 + this.depth * 0.35);
      this.vy = (Math.random() - 0.5) * (0.08 + this.depth * 0.35);
      this.opacity = 0.15 + this.depth * 0.45;
      this.color = ['#8b5cf6', '#3b82f6', '#06b6d4', '#a78bfa'][Math.floor(Math.random() * 4)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      // subtle parallax drift toward mouse depth
      this.x += (mouseX - 0.5) * this.depth * 0.15;
      this.y += (mouseY - 0.5) * this.depth * 0.15;
      if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = this.depth > 0.7 ? 6 : 0;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles = Array.from({ length: 140 }, () => new Particle());
  }

  function drawConnections() {
    const max = 100;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        if (particles[i].depth < 0.5 || particles[j].depth < 0.5) continue; // only connect near particles
        const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (d < max) {
          ctx.save();
          ctx.globalAlpha = (1 - d / max) * 0.1;
          ctx.strokeStyle = '#8b5cf6';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  // Perspective "floor grid" — cyberpunk/gamer aesthetic, fades near horizon
  function drawGrid() {
    const horizon = H * 0.62;
    const vanishX = W * 0.5 + (mouseX - 0.5) * 40;
    ctx.save();

    // horizontal glow line at horizon
    const glow = ctx.createLinearGradient(0, horizon - 40, 0, horizon + 4);
    glow.addColorStop(0, 'rgba(139,92,246,0)');
    glow.addColorStop(1, 'rgba(139,92,246,0.12)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, horizon - 40, W, 44);

    // vertical lines converging to vanishing point
    const lineCount = 14;
    for (let i = -lineCount; i <= lineCount; i++) {
      const spread = i / lineCount;
      const bottomX = vanishX + spread * W * 1.1;
      ctx.beginPath();
      ctx.moveTo(vanishX, horizon);
      ctx.lineTo(bottomX, H);
      const alpha = 0.05 * (1 - Math.abs(spread) * 0.4);
      ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // horizontal receding lines (with perspective easing) that slowly scroll for motion feel
    const rows = 8;
    for (let r = 0; r < rows; r++) {
      const t = ((r / rows) + gridOffset % (1 / rows)) % 1;
      const y = horizon + Math.pow(t, 2.2) * (H - horizon);
      const alpha = 0.06 * (1 - t);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    gridOffset += 0.0009;
    requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  });

  resize();
  initParticles();
  animate();
  window.addEventListener('resize', () => { resize(); });
})();
