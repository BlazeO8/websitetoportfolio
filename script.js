// ======= Typing Animation =======
function typeText(el, text, speed=50, cb=null){
  el.innerHTML="";
  let i=0;
  function typing(){
    if(i<text.length){ el.innerHTML+=text.charAt(i); i++; setTimeout(typing,speed); }
    else if(cb) cb();
  }
  typing();
}

const typingNameEl=document.getElementById("typingName");
const typingAboutEl=document.getElementById("typingAbout");
const typingSkillsEl=document.getElementById("typingSkills");
const aboutTextEl=document.getElementById("aboutText");

const nameText="Kartik Jindal";
const aboutText="I’m a BCA student with a keen interest in databases, game design, and advanced AI technologies. I enjoy solving complex problems using Python and building projects that blend creativity with logic. My goal is to evolve into a skilled developer and AI enthusiast.";
const skillsText=["Python","Databases","Game Design","AI / ML Basics","C / C++","Networking & Cybersecurity"];

typeText(typingNameEl,nameText,100,()=>{
  typeText(typingAboutEl,aboutText,20,()=>{
    let skillIndex=0;
    function typeSkills(){
      typingSkillsEl.innerHTML="";
      typeText(typingSkillsEl,skillsText[skillIndex],50,()=>{
        setTimeout(()=>{ skillIndex=(skillIndex+1)%skillsText.length; typeSkills(); },1000);
      });
    }
    typeSkills();
  });
});
aboutTextEl.textContent=aboutText;

// ======= Theme Toggle =======
const themeToggle=document.getElementById("themeToggle");
themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("light-theme");
  localStorage.setItem("theme",document.body.classList.contains("light-theme")?"light":"dark");
});
if(localStorage.getItem("theme")==="light") document.body.classList.add("light-theme");

// ======= Draggable Theme Toggle Fix =======
let isDragging=false, offsetX, offsetY;
themeToggle.addEventListener("mousedown", e=>{
  isDragging=true;
  offsetX=e.clientX-themeToggle.getBoundingClientRect().left;
  offsetY=e.clientY-themeToggle.getBoundingClientRect().top;
  themeToggle.style.cursor="grabbing";
});
document.addEventListener("mousemove", e=>{
  if(isDragging){
    const left=e.clientX-offsetX;
    const top=e.clientY-offsetY;
    themeToggle.style.left=`${Math.min(Math.max(left,0),window.innerWidth-themeToggle.offsetWidth)}px`;
    themeToggle.style.top=`${Math.min(Math.max(top,0),window.innerHeight-themeToggle.offsetHeight)}px`;
  }
});
document.addEventListener("mouseup", ()=>{
  if(isDragging){
    isDragging=false;
    themeToggle.style.cursor="grab";
  }
});

// ======= Menu Toggle =======
document.querySelector(".menu-toggle").addEventListener("click",()=>{
  document.querySelector(".nav-links").classList.toggle("active");
});

// ======= Scroll Reveal =======
const revealElements=document.querySelectorAll("section,.certificate-card,.project-card");
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("active");
    else entry.target.classList.remove("active");
  });
},{threshold:0.2});
revealElements.forEach(el=>observer.observe(el));

// ======= Certificate Search =======
function filterCertificates(){
  const query=document.getElementById("certificateSearch").value.toLowerCase();
  document.querySelectorAll(".certificate-card").forEach(card=>{
    card.style.display=card.dataset.title.toLowerCase().includes(query)?"block":"none";
  });
}

// ======= Feedback =======
const feedbackForm=document.getElementById("feedbackForm");
feedbackForm.addEventListener("submit", async e=>{
  e.preventDefault();
  const feedback={
    name:document.getElementById("name").value,
    email:document.getElementById("email").value,
    message:document.getElementById("message").value,
    date:new Date().toLocaleString()
  };
  let feedbacks=JSON.parse(localStorage.getItem("feedbacks"))||[];
  feedbacks.push(feedback);
  localStorage.setItem("feedbacks",JSON.stringify(feedbacks));
  displayFeedbacks();
  feedbackForm.reset();
  document.getElementById("feedbackMsg").innerText="✅ Feedback submitted!";
});
function displayFeedbacks(){
  const feedbacks=JSON.parse(localStorage.getItem("feedbacks"))||[];
  const list=document.getElementById("feedbackList");
  list.innerHTML="";
  feedbacks.forEach(fb=>{
    const li=document.createElement("li");
    li.innerHTML=`<strong>${fb.name}</strong> <em>(${fb.date})</em><br>${fb.message}`;
    list.appendChild(li);
  });
}
displayFeedbacks();
