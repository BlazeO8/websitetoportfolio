// ========================
// SITE 2 FEATURES (Canvas, Typing, Animations)
// ========================
/* ========================
   ANIMATED BACKGROUND
======================== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [], animFrame;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

class Particle {
  constructor() { this.reset() }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.25;
    this.vy = (Math.random() - 0.5) * 0.25;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = ['#8b5cf6','#3b82f6','#06b6d4','#a78bfa'][Math.floor(Math.random()*4)];
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if(this.x<0||this.x>W||this.y<0||this.y>H) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

function initParticles() {
  particles = Array.from({length:120},()=>new Particle());
}

function drawConnections() {
  const max = 100;
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const d = Math.hypot(particles[i].x-particles[j].x,particles[i].y-particles[j].y);
      if(d<max){
        ctx.save();
        ctx.globalAlpha = (1-d/max)*0.08;
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{p.update();p.draw()});
  drawConnections();
  animFrame = requestAnimationFrame(animate);
}

resize(); initParticles(); animate();
window.addEventListener('resize',()=>{resize();});


/* ========================
   TYPING EFFECT
======================== */
const phrases = [
  "AI Engineer & Python Developer",
  "BCA Student | Game Designer",
  "Database Architect",
  "Building Tomorrow's Solutions"
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const el = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIdx];
  if(!deleting) {
    el.textContent = current.slice(0,++charIdx);
    if(charIdx===current.length) { deleting=true; setTimeout(type,1800); return; }
    setTimeout(type,60);
  } else {
    el.textContent = current.slice(0,--charIdx);
    if(charIdx===0) { deleting=false; phraseIdx=(phraseIdx+1)%phrases.length; setTimeout(type,300); return; }
    setTimeout(type,30);
  }
}
setTimeout(type, 800);

/* ========================
   SCROLL REVEAL
======================== */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // Skill bars
      const bar = e.target.querySelector('.skill-bar');
      if(bar){
        const level = e.target.dataset.level||'70';
        setTimeout(()=>{ bar.style.width = level+'%' },200);
      }
    }
  });
},{threshold:0.12});
reveals.forEach(el=>observer.observe(el));

/* ========================
   THEME TOGGLE
======================== */
const toggle = document.getElementById('theme-toggle');
let isDark = true;
toggle.addEventListener('click',()=>{
  isDark = !isDark;
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  toggle.textContent = isDark ? '🌙' : '☀️';
});

/* ========================
   HAMBURGER
======================== */
const ham = document.getElementById('hamburger');
const nav = document.getElementById('nav-links');
ham.addEventListener('click',()=>{
  nav.classList.toggle('open');
  const spans = ham.querySelectorAll('span');
  if(nav.classList.contains('open')){
    spans[0].style.transform='translateY(7px) rotate(45deg)';
    spans[1].style.opacity='0';
    spans[2].style.transform='translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s=>{s.style.transform='';s.style.opacity=''});
  }
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');
  ham.querySelectorAll('span').forEach(s=>{s.style.transform='';s.style.opacity=''});
}));

/* ========================
   CERT SEARCH
======================== */
document.getElementById('cert-search').addEventListener('input',function(){
  const q = this.value.toLowerCase();
  document.querySelectorAll('.cert-card').forEach(c=>{
    const title = c.dataset.title.toLowerCase();
    c.style.opacity = title.includes(q)||!q ? '1' : '0.2';
    c.style.transform = title.includes(q)||!q ? '' : 'scale(0.96)';
    c.style.transition = 'opacity .3s, transform .3s';
  });
});

/* ========================
   3D TILT ON SKILL CARDS
======================== */
document.querySelectorAll('.skill-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width - 0.5;
    const y = (e.clientY-r.top)/r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateY(-6px) scale(1.02)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform = '';
    card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
  });
});

/* ========================
   PARALLAX HERO
======================== */
document.addEventListener('mousemove',e=>{
  const glow = document.querySelector('.hero-glow');
  if(!glow) return;
  const x = (e.clientX/window.innerWidth - 0.5) * 40;
  const y = (e.clientY/window.innerHeight - 0.5) * 40;
  glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});

/* KEEP REST OF JS EXACTLY SAME FROM ORIGINAL FILE */

/* ======================== 
   SITE 1 FEATURES (Feedback + About Text)
======================== */
const aboutTextEl = document.getElementById("aboutText");
aboutTextEl.textContent = "I’m a BCA student with a keen interest in databases, game design, and advanced AI technologies. I enjoy solving complex problems using Python and building projects that blend creativity with logic. My goal is to evolve into a skilled developer and AI enthusiast.";

// ======= FEEDBACK FORM (SITE 1) =======
const feedbackForm = document.getElementById("feedbackForm");
const feedbackMsg = document.getElementById("feedbackMsg");
const feedbackList = document.getElementById("feedbackList");
const SHEET_URL = "https://script.google.com/macros/s/AKfycbxTV5qoWWXMcRWp4xsmXBzeEI6vfs8Y86Cc3K917GIsr_wW2p8A98Bgs_NlhFBtztxr4w/exec";

feedbackForm.addEventListener("submit", async e => {
  e.preventDefault();
  const feedback = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
    date: new Date().toLocaleString()
  };

  // Save locally
  let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbacks.push(feedback);
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  displayFeedbacks();

  // Send to Google Sheets
  try {
    const res = await fetch(SHEET_URL, {
      method: "POST",
      body: JSON.stringify(feedback),
      headers: { "Content-Type": "application/json" }
    });
    feedbackMsg.innerText = "✅ Feedback sent to Google Sheets!";
    feedbackMsg.style.color = "var(--purple)";
  } catch (err) {
    feedbackMsg.innerText = "⚠️ Saved locally!";
    feedbackMsg.style.color = "var(--text2)";
  }

  feedbackForm.reset();
});

function displayFeedbacks() {
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbackList.innerHTML = feedbacks.map(fb => 
    `<li><strong>${fb.name}</strong> <em>(${fb.date})</em><br>${fb.message}</li>`
  ).join('');
}
displayFeedbacks();

// Certificate search (enhanced)
document.getElementById('cert-search').addEventListener('input', function(){
  const q = this.value.toLowerCase();
  document.querySelectorAll('.cert-card').forEach(c => {
    const title = c.dataset.title.toLowerCase();
    if(title.includes(q) || !q) {
      c.style.display = 'block';
      c.style.opacity = '1';
      c.style.transform = '';
    } else {
      c.style.display = 'none';
    }
  });
});
