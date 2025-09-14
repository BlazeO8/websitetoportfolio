// Mobile Menu
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

// ScrollReveal Animations
ScrollReveal({distance:'50px', duration:1000, easing:'ease-in-out', reset:false});
ScrollReveal().reveal('.hero-text', {origin:'bottom'});
ScrollReveal().reveal('.about-container', {origin:'left', interval:200});
ScrollReveal().reveal('.skill-card', {origin:'bottom', interval:150});
ScrollReveal().reveal('.certificate-card', {origin:'bottom', interval:150});
ScrollReveal().reveal('.project-card', {origin:'bottom', interval:150});
ScrollReveal().reveal('#resume', {origin:'right'});
ScrollReveal().reveal('#feedback', {origin:'bottom'});
ScrollReveal().reveal('#contact', {origin:'top'});
ScrollReveal().reveal('footer', {origin:'bottom'});

// Certificate Modal
function openModal(src){
  document.getElementById('pdfViewer').src = src;
  document.getElementById('pdfModal').style.display = 'flex';
}
function closeModal(){
  document.getElementById('pdfModal').style.display = 'none';
  document.getElementById('pdfViewer').src = '';
}

// Certificate Search
function filterCertificates() {
  let input = document.getElementById('certificateSearch').value.toLowerCase();
  let cards = document.querySelectorAll('.certificate-card');
  cards.forEach(card => {
    card.style.display = card.dataset.title.toLowerCase().includes(input) ? '' : 'none';
  });
}

// Feedback Form
const feedbackForm = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');
const feedbackMsg = document.getElementById('feedbackMsg');

function renderFeedback() {
  feedbackList.innerHTML = '';
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
  feedbacks.forEach(f => {
    const li = document.createElement('li');
    li.textContent = `${f.name} (${f.email}): ${f.message}`;
    feedbackList.appendChild(li);
  });
}

feedbackForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if(name && email && message){
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    feedbacks.push({name,email,message});
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    renderFeedback();
    feedbackMsg.textContent="Feedback submitted! Thank you.";
    feedbackForm.reset();
    setTimeout(()=>{feedbackMsg.textContent='';},3000);
  }
});
renderFeedback();

// Download All Certificates
document.getElementById('downloadAllBtn').addEventListener('click', async () => {
  const zip = new JSZip();
  const cards = document.querySelectorAll('.certificate-card a.btn-download');
  for(let i=0;i<cards.length;i++){
    const url = cards[i].href;
    const filename = url.split('/').pop();
    const res = await fetch(url);
    const blob = await res.blob();
    zip.file(filename, blob);
  }
  zip.generateAsync({type:"blob"}).then(content => saveAs(content,"certificates.zip"));
});
