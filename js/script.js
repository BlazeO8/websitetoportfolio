/* ============================================================
   INDEX PAGE — typing effect, 3D tilt, parallax, feedback form,
   and rendering of FEATURED projects/certificates.
   (nav/theme/reveal handled by common.js, bg by background.js,
   data by data.js, card markup by cards.js)
   ============================================================ */

/* TYPING EFFECT */
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
  if (!deleting) {
    el.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; setTimeout(type, 1800); return; }
    setTimeout(type, 60);
  } else {
    el.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(type, 300); return; }
    setTimeout(type, 30);
  }
}
setTimeout(type, 800);

/* 3D TILT ON SKILL CARDS */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-6px) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
  });
});

/* PARALLAX HERO GLOW */
document.addEventListener('mousemove', e => {
  const glow = document.querySelector('.hero-glow');
  if (!glow) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;
  glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});

/* ABOUT TEXT */
const aboutTextEl = document.getElementById("aboutText");
if (aboutTextEl) {
  aboutTextEl.textContent = "I'm a BCA student with a keen interest in databases, game design, and advanced AI technologies. I enjoy solving complex problems using Python and building projects that blend creativity with logic. My goal is to evolve into a skilled developer and AI enthusiast.";
}

/* FEEDBACK FORM */
const feedbackForm = document.getElementById("feedbackForm");
const feedbackMsg = document.getElementById("feedbackMsg");
const feedbackList = document.getElementById("feedbackList");
const SHEET_URL = "https://script.google.com/macros/s/AKfycbxTV5qoWWXMcRWp4xsmXBzeEI6vfs8Y86Cc3K917GIsr_wW2p8A98Bgs_NlhFBtztxr4w/exec";

if (feedbackForm) {
  feedbackForm.addEventListener("submit", async e => {
    e.preventDefault();
    const feedback = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim(),
      date: new Date().toLocaleString()
    };

    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    displayFeedbacks();

    try {
      await fetch(SHEET_URL, {
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
}

function displayFeedbacks() {
  if (!feedbackList) return;
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbackList.innerHTML = feedbacks.map(fb =>
    `<li><strong>${fb.name}</strong> <em>(${fb.date})</em><br>${fb.message}</li>`
  ).join('');
}
displayFeedbacks();

/* FEATURED PROJECTS + CERTIFICATES (data-driven, see data.js / cards.js) */
renderFeatured('featured-certs-grid', CERTIFICATES, certCardHTML, 4);
renderFeatured('featured-projects-grid', PROJECTS, projectCardHTML, 3);
