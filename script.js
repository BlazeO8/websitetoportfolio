

/* Certificate Image Thumbs */
.cert-thumb-img {
  width: 100%; height: 160px; object-fit: cover; 
}

.cert-links {
  display: flex; gap: 0.5rem; margin-top: 0.75rem; flex-wrap: wrap;
}

.cert-btn {
  padding: 0.3rem 0.8rem; border-radius: 6px; 
  font-size: 0.75rem; font-weight: 600; 
  background: var(--surface2); border: 1px solid var(--border2);
  color: var(--purple2); text-decoration: none; transition: all 0.3s;
}

.cert-btn:hover {
  background: var(--purple); color: white; 
  box-shadow: 0 0 12px var(--glow-p);
}

.cert-btn.download {
  background: linear-gradient(135deg, var(--blue), var(--cyan));
  color: white; border-color: var(--blue);
}

.about-avatar {
  width: 260px; height: 260px; border-radius: 28px; 
  object-fit: cover; border: 4px solid rgba(139,92,246,0.3);
  position: relative; z-index: 2;
}

/* Feedback List Styling */
#feedbackList {
  max-height: 300px; overflow-y: auto; 
  padding: 1rem; background: var(--surface); 
  border-radius: 12px; border: 1px solid var(--border);
}

#feedbackList li {
  padding: 0.75rem; margin-bottom: 0.75rem; 
  background: var(--surface2); border-radius: 8px; 
  text-align: left; list-style: none;
}

#feedbackList li:last-child { margin-bottom: 0; }

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
--bg:#04030a;
--bg2:#080614;
--surface:rgba(255,255,255,0.03);
--surface2:rgba(255,255,255,0.06);
--border:rgba(255,255,255,0.07);
--border2:rgba(139,92,246,0.3);
--text:#f0eeff;
--text2:#a89ec9;
--text3:#6b5f8a;
--purple:#8b5cf6;
--purple2:#a78bfa;
--blue:#3b82f6;
--blue2:#60a5fa;
--cyan:#06b6d4;
--pink:#ec4899;
--glow-p:rgba(139,92,246,0.4);
--glow-b:rgba(59,130,246,0.3);
--glow-c:rgba(6,182,212,0.3);
--nav-h:64px;
--font-head:'Syne',sans-serif;
--font-body:'Space Grotesk',sans-serif;
}
[data-theme="light"]{
--bg:#f8f6ff;
--bg2:#ffffff;
--surface:rgba(139,92,246,0.04);
--surface2:rgba(139,92,246,0.08);
--border:rgba(139,92,246,0.12);
--border2:rgba(139,92,246,0.35);
--text:#1a0a3a;
--text2:#5b3f8a;
--text3:#9b80cc;
--glow-p:rgba(139,92,246,0.2);
--glow-b:rgba(59,130,246,0.15);
--glow-c:rgba(6,182,212,0.15);
}
html{scroll-behavior:smooth;scroll-padding-top:var(--nav-h)}
body{background:var(--bg);color:var(--text);font-family:var(--font-body);font-size:16px;line-height:1.7;overflow-x:hidden;transition:background .4s,color .4s}
::selection{background:rgba(139,92,246,0.35);color:#fff}

/* SCROLLBAR */
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--purple);border-radius:2px}

/* CANVAS BG */
#bg-canvas{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.6}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:100;height:var(--nav-h);display:flex;align-items:center;justify-content:space-between;padding:0 clamp(1.5rem,5vw,4rem);background:rgba(4,3,10,0.6);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);transition:background .4s}
[data-theme="light"] nav{background:rgba(248,246,255,0.7)}
.nav-logo{font-family:var(--font-head);font-weight:800;font-size:1.2rem;background:linear-gradient(135deg,var(--purple2),var(--blue2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-.02em}
.nav-links{display:flex;gap:2rem;list-style:none}
.nav-links a{color:var(--text2);text-decoration:none;font-size:.875rem;font-weight:500;letter-spacing:.04em;transition:color .2s;position:relative}
.nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:var(--purple);transition:width .3s}
.nav-links a:hover{color:var(--text)}.nav-links a:hover::after{width:100%}
.nav-actions{display:flex;gap:.75rem;align-items:center}
#theme-toggle{width:40px;height:40px;border-radius:50%;border:1px solid var(--border2);background:var(--surface);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:all .3s;color:var(--text2)}
#theme-toggle:hover{background:var(--surface2);box-shadow:0 0 16px var(--glow-p);color:var(--text)}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:8px;border:none;background:none}
.hamburger span{display:block;width:22px;height:2px;background:var(--text2);border-radius:1px;transition:all .3s}

/* MAIN */
main{position:relative;z-index:1}
section{padding:clamp(4rem,10vh,7rem) clamp(1.5rem,5vw,4rem);max-width:1200px;margin:0 auto}

/* SECTION LABEL */
.section-label{display:inline-flex;align-items:center;gap:.5rem;font-size:.75rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--purple2);margin-bottom:1rem;opacity:.8}
.section-label::before{content:'';display:block;width:2rem;height:1px;background:linear-gradient(90deg,transparent,var(--purple))}
.section-title{font-family:var(--font-head);font-size:clamp(2rem,5vw,3.5rem);font-weight:800;line-height:1.1;letter-spacing:-.03em;margin-bottom:1.5rem}
.gradient-text{background:linear-gradient(135deg,var(--purple2) 0%,var(--blue2) 50%,var(--cyan) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent}

/* REVEAL ANIMATION */
.reveal{opacity:0;transform:translateY(32px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-delay-1{transition-delay:.1s}
.reveal-delay-2{transition-delay:.2s}
.reveal-delay-3{transition-delay:.3s}
.reveal-delay-4{transition-delay:.4s}

/* ===== HERO ===== */
#hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding-top:calc(var(--nav-h) + 2rem);position:relative;overflow:hidden}
.hero-content{position:relative;z-index:2}
.hero-eyebrow{display:inline-flex;align-items:center;gap:.75rem;padding:.5rem 1.25rem;background:var(--surface2);border:1px solid var(--border2);border-radius:100px;font-size:.8rem;font-weight:500;color:var(--purple2);margin-bottom:2rem;animation:fadeDown .8s ease both}
.hero-eyebrow span{width:6px;height:6px;background:var(--cyan);border-radius:50%;animation:pulse-dot 2s infinite}
@keyframes fadeDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(6,182,212,.6)}50%{box-shadow:0 0 0 6px rgba(6,182,212,0)}}
.hero-name{font-family:var(--font-head);font-size:clamp(3rem,9vw,7rem);font-weight:800;line-height:1;letter-spacing:-.04em;margin-bottom:1rem;animation:fadeUp .8s .15s ease both}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.hero-name .line1{display:block;color:var(--text)}
.hero-name .line2{display:block;background:linear-gradient(135deg,var(--purple) 0%,var(--blue) 40%,var(--cyan) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.typing-container{font-size:clamp(1rem,2.5vw,1.35rem);color:var(--text2);min-height:2em;margin-bottom:2.5rem;animation:fadeUp .8s .3s ease both}
.cursor{display:inline-block;width:2px;height:1.1em;background:var(--purple);margin-left:2px;vertical-align:middle;animation:blink 1s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.hero-desc{max-width:540px;color:var(--text2);font-size:1.05rem;line-height:1.8;margin-bottom:3rem;animation:fadeUp .8s .45s ease both}
.hero-cta{display:flex;flex-wrap:wrap;gap:1rem;animation:fadeUp .8s .6s ease both}
.btn-primary{display:inline-flex;align-items:center;gap:.6rem;padding:.875rem 2rem;background:linear-gradient(135deg,var(--purple),var(--blue));border:none;border-radius:12px;color:#fff;font-family:var(--font-body);font-size:.95rem;font-weight:600;cursor:pointer;text-decoration:none;transition:all .3s;position:relative;overflow:hidden}
.btn-primary::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--blue),var(--cyan));opacity:0;transition:opacity .3s}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(139,92,246,.4)}
.btn-primary:hover::before{opacity:1}
.btn-primary span{position:relative;z-index:1}
.btn-outline{display:inline-flex;align-items:center;gap:.6rem;padding:.875rem 2rem;background:transparent;border:1px solid var(--border2);border-radius:12px;color:var(--text);font-family:var(--font-body);font-size:.95rem;font-weight:500;cursor:pointer;text-decoration:none;transition:all .3s}
.btn-outline:hover{background:var(--surface2);border-color:var(--purple);box-shadow:0 0 24px var(--glow-p);transform:translateY(-2px)}
.hero-scroll{position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:.5rem;color:var(--text3);font-size:.75rem;letter-spacing:.1em;animation:fadeUp 1s 1.2s ease both}
.scroll-line{width:1px;height:40px;background:linear-gradient(to bottom,var(--purple),transparent);animation:scrollPulse 2s infinite}
@keyframes scrollPulse{0%{transform:scaleY(1);opacity:1}100%{transform:scaleY(0);opacity:0;transform-origin:top}}
.hero-glow{position:absolute;top:50%;left:40%;transform:translate(-50%,-50%);width:600px;height:600px;background:radial-gradient(ellipse,rgba(139,92,246,.15) 0%,transparent 70%);pointer-events:none;z-index:1;animation:glowPulse 4s ease-in-out infinite}
@keyframes glowPulse{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.1)}}

/* ===== ABOUT ===== */
#about .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.about-image-wrap{position:relative;display:flex;justify-content:center}
.about-avatar{width:260px;height:260px;border-radius:28px;background:linear-gradient(135deg,var(--purple),var(--blue),var(--cyan));display:flex;align-items:center;justify-content:center;font-family:var(--font-head);font-size:6rem;font-weight:800;color:rgba(255,255,255,.9);position:relative;animation:float 4s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-14px) rotate(1deg)}}
.avatar-ring{position:absolute;inset:-16px;border-radius:40px;border:1px solid rgba(139,92,246,.3);animation:rotate-ring 8s linear infinite}
.avatar-ring2{position:absolute;inset:-32px;border-radius:52px;border:1px solid rgba(59,130,246,.15);animation:rotate-ring 14s linear infinite reverse}
@keyframes rotate-ring{to{transform:rotate(360deg)}}
.avatar-blob{position:absolute;inset:-60px;background:radial-gradient(ellipse,rgba(139,92,246,.15),transparent 70%);z-index:-1}
.about-text p{color:var(--text2);font-size:1.05rem;margin-bottom:1.25rem;line-height:1.8}
.about-tags{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1.5rem}
.tag{padding:.35rem .9rem;border-radius:100px;background:var(--surface2);border:1px solid var(--border2);font-size:.8rem;font-weight:500;color:var(--purple2);transition:all .2s}
.tag:hover{background:rgba(139,92,246,.15);box-shadow:0 0 12px var(--glow-p)}

/* ===== SKILLS ===== */
#skills{background:transparent}
.skills-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.25rem;margin-top:2.5rem}
.skill-card{padding:1.75rem 1.5rem;background:var(--surface);border:1px solid var(--border);border-radius:20px;cursor:default;transition:all .4s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden}
.skill-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--purple),var(--blue));opacity:0;transition:opacity .4s}
.skill-card:hover{transform:translateY(-6px) scale(1.02);border-color:var(--border2);box-shadow:0 20px 50px var(--glow-p)}
.skill-card:hover::before{opacity:.07}
.skill-icon{font-size:2rem;margin-bottom:1rem;display:block;transition:transform .4s}
.skill-card:hover .skill-icon{transform:scale(1.2) rotate(-5deg)}
.skill-name{font-family:var(--font-head);font-size:1rem;font-weight:700;color:var(--text);margin-bottom:.4rem}
.skill-desc{font-size:.8rem;color:var(--text2);line-height:1.5}
.skill-bar-wrap{margin-top:1rem;height:3px;background:var(--border);border-radius:2px;overflow:hidden}
.skill-bar{height:100%;background:linear-gradient(90deg,var(--purple),var(--blue));border-radius:2px;width:0;transition:width 1.2s cubic-bezier(.16,1,.3,1)}

/* ===== CERTS ===== */
#certificates .certs-header{display:flex;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:2.5rem}
.cert-search{flex:1;min-width:220px;padding:.65rem 1.25rem;background:var(--surface2);border:1px solid var(--border);border-radius:12px;color:var(--text);font-family:var(--font-body);font-size:.9rem;outline:none;transition:all .3s}
.cert-search::placeholder{color:var(--text3)}
.cert-search:focus{border-color:var(--border2);box-shadow:0 0 0 3px rgba(139,92,246,.1)}
.certs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.25rem}
.cert-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;overflow:hidden;cursor:pointer;transition:all .4s cubic-bezier(.16,1,.3,1);position:relative}
.cert-card:hover{transform:translateY(-6px);border-color:var(--border2);box-shadow:0 20px 50px var(--glow-b)}
.cert-thumb{height:160px;background:linear-gradient(135deg,var(--purple) 0%,var(--blue) 100%);display:flex;align-items:center;justify-content:center;font-size:3rem;position:relative;overflow:hidden}
.cert-thumb::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(0,0,0,.5))}
.cert-body{padding:1.25rem}
.cert-title{font-family:var(--font-head);font-weight:700;font-size:1rem;color:var(--text);margin-bottom:.35rem}
.cert-issuer{font-size:.8rem;color:var(--text2)}
.cert-badge{display:inline-flex;align-items:center;gap:.3rem;padding:.25rem .7rem;border-radius:100px;background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.2);font-size:.72rem;font-weight:600;color:var(--purple2);margin-top:.75rem}
.cert-card[hidden]{display:none!important}

/* ===== PROJECTS ===== */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.5rem;margin-top:2.5rem}
.project-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:2rem;transition:all .4s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden;cursor:pointer}
.project-card::before{content:'';position:absolute;inset:0;background:var(--pc-grad,linear-gradient(135deg,var(--purple),var(--blue)));opacity:0;transition:opacity .4s}
.project-card:hover{transform:translateY(-8px);box-shadow:0 24px 60px var(--glow-p);border-color:var(--border2)}
.project-card:hover::before{opacity:.06}
.project-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.25rem}
.project-icon{width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,var(--purple),var(--blue));display:flex;align-items:center;justify-content:center;font-size:1.35rem;flex-shrink:0}
.project-link-icon{color:var(--text3);transition:color .2s,transform .2s}
.project-card:hover .project-link-icon{color:var(--purple2);transform:translate(3px,-3px)}
.project-title{font-family:var(--font-head);font-weight:700;font-size:1.1rem;color:var(--text);margin-bottom:.6rem}
.project-desc{font-size:.875rem;color:var(--text2);line-height:1.7;margin-bottom:1.25rem}
.project-tags{display:flex;flex-wrap:wrap;gap:.5rem}
.project-tag{padding:.2rem .65rem;border-radius:6px;background:var(--surface2);border:1px solid var(--border);font-size:.72rem;font-weight:600;color:var(--text3);transition:all .2s}
.project-card:hover .project-tag{border-color:var(--border2);color:var(--purple2)}

/* ===== RESUME ===== */
#resume{text-align:center}
.resume-box{display:inline-flex;flex-direction:column;align-items:center;gap:2rem;padding:4rem;background:var(--surface);border:1px solid var(--border);border-radius:28px;max-width:540px;width:100%;position:relative;overflow:hidden}
.resume-box::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(139,92,246,.05),rgba(59,130,246,.05));pointer-events:none}
.resume-icon{font-size:3.5rem;animation:float 4s ease-in-out infinite}
.resume-box h3{font-family:var(--font-head);font-size:1.5rem;font-weight:800;color:var(--text)}
.resume-box p{color:var(--text2);font-size:.95rem}
.btn-download{display:inline-flex;align-items:center;gap:.75rem;padding:1rem 2.5rem;background:linear-gradient(135deg,var(--purple),var(--blue));border:none;border-radius:14px;color:#fff;font-family:var(--font-body);font-size:1rem;font-weight:600;cursor:pointer;text-decoration:none;transition:all .3s;position:relative;overflow:hidden}
.btn-download::after{content:'';position:absolute;top:50%;left:50%;width:0;height:0;background:rgba(255,255,255,.15);border-radius:50%;transform:translate(-50%,-50%);transition:width .5s,height .5s}
.btn-download:hover::after{width:300px;height:300px}
.btn-download:hover{transform:translateY(-3px);box-shadow:0 20px 50px rgba(139,92,246,.5)}

/* ===== CONTACT ===== */
#contact .contact-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:4rem;align-items:start}
.contact-info h2{font-family:var(--font-head);font-size:clamp(1.5rem,4vw,2.5rem);font-weight:800;line-height:1.2;margin-bottom:1rem}
.contact-info p{color:var(--text2);line-height:1.8;margin-bottom:2rem}
.social-links{display:flex;flex-direction:column;gap:.75rem}
.social-link{display:flex;align-items:center;gap:1rem;padding:.85rem 1.25rem;background:var(--surface);border:1px solid var(--border);border-radius:14px;color:var(--text2);text-decoration:none;transition:all .3s;font-weight:500}
.social-link:hover{background:var(--surface2);border-color:var(--border2);color:var(--text);box-shadow:0 8px 24px var(--glow-p);transform:translateX(4px)}
.social-icon{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--purple),var(--blue));display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
.contact-form{background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:2.5rem}
.form-group{margin-bottom:1.5rem;position:relative}
.form-group label{display:block;font-size:.8rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text3);margin-bottom:.6rem;transition:color .2s}
.form-group:focus-within label{color:var(--purple2)}
.form-control{width:100%;padding:.85rem 1.25rem;background:var(--surface2);border:1px solid var(--border);border-radius:12px;color:var(--text);font-family:var(--font-body);font-size:.95rem;outline:none;transition:all .3s;resize:none}
.form-control::placeholder{color:var(--text3)}
.form-control:focus{border-color:var(--border2);box-shadow:0 0 0 3px rgba(139,92,246,.1),0 0 20px rgba(139,92,246,.05)}
textarea.form-control{height:130px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.submit-btn{width:100%;padding:1rem;background:linear-gradient(135deg,var(--purple),var(--blue));border:none;border-radius:12px;color:#fff;font-family:var(--font-body);font-size:1rem;font-weight:600;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}
.submit-btn:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(139,92,246,.4)}

/* ===== FOOTER ===== */
footer{border-top:1px solid var(--border);padding:2rem clamp(1.5rem,5vw,4rem);text-align:center;color:var(--text3);font-size:.85rem;position:relative;z-index:1}
footer span{color:var(--purple2)}

/* MOBILE */
@media(max-width:768px){
nav .nav-links{display:none;position:fixed;inset:var(--nav-h) 0 0 0;background:rgba(4,3,10,.97);flex-direction:column;align-items:center;justify-content:center;gap:2rem;z-index:99}
[data-theme="light"] nav .nav-links{background:rgba(248,246,255,.97)}
nav .nav-links.open{display:flex}
.hamburger{display:flex}
#about .about-grid{grid-template-columns:1fr;gap:2.5rem}
.about-image-wrap{order:-1}
#contact .contact-grid{grid-template-columns:1fr;gap:2.5rem}
.form-row{grid-template-columns:1fr}
.hero-name{font-size:clamp(2.5rem,12vw,4rem)}
.resume-box{padding:2.5rem 1.5rem}
}
