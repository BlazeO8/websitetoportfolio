# Kartik Jindal — Portfolio

Live site → **[blazeo8.github.io/websitetoportfolio](https://blazeo8.github.io/websitetoportfolio/)**

A personal developer portfolio built from scratch with vanilla HTML, CSS, and JavaScript — no frameworks, no build step. Showcases projects, certifications, skills, and a downloadable resume, with a fully data-driven content system so new entries never require touching markup.

---

## ✨ Features

- **Animated hero & about section** with canvas-based particle background
- **Glassmorphism UI** with scroll-triggered reveal animations
- **Skills showcase** with animated progress bars
- **Projects gallery** — filterable by category (Web, Games, AI/ML, Database, Finance, Other), with tags, gradients, and links to live demos or repos
- **Certificates gallery** — filterable by category, with thumbnail previews and direct PDF downloads, including in-progress course tracking
- **Resume download** button
- **Fully responsive** across desktop, tablet, and mobile
- **Data-driven content** — all projects and certificates live in one file (`js/data.js`); adding new entries never requires editing HTML

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, glassmorphism, responsive grid/flexbox) |
| Interactivity | Vanilla JavaScript (ES6+) |
| Graphics | HTML5 Canvas API (particle background) |
| Hosting | GitHub Pages |

No frameworks, no bundler, no dependencies — open `index.html` and it runs.

## 📁 Project Structure

```
websitetoportfolio/
├── index.html              # Landing page (hero, about, skills)
├── me.jpeg                 # Profile photo
├── resume.pdf              # Downloadable resume
├── css/
│   └── style.css           # All site styling
├── js/
│   ├── data.js             # ⭐ Single source of truth — add projects/certs here
│   ├── cards.js             # Card rendering logic (shared by projects & certificates)
│   ├── common.js            # Shared utilities (nav, reveal-on-scroll, etc.)
│   ├── script.js            # Landing page interactions
│   ├── background.js        # Hero canvas particle animation
│   ├── pacman-bg.js         # Decorative background animation
│   ├── projects.js          # Projects page: filtering, stats, rendering
│   └── certificates.js      # Certificates page: filtering, stats, rendering
├── pages/
│   ├── projects.html        # Projects gallery page
│   └── certificates.html    # Certificates gallery page
└── certificates/
    ├── *.pdf                 # Certificate source files
    ├── thumbnails/*.png      # Certificate preview images
    └── anthropic/*.pdf       # Anthropic Academy certificates
```

## ➕ Adding Content

Everything is driven by `js/data.js` — no HTML editing required.

**New project:**
```js
{
  title: 'Project Name',
  desc: 'Short description of what it does.',
  icon: '🚀', category: 'web', featured: true,
  tags: ['Tech', 'Stack', 'Here'],
  grad: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
  link: 'https://github.com/you/repo',
}
```

**New certificate:**
```js
{
  title: 'Certificate Name',
  issuer: 'Issuing Org',
  category: 'ai-ml',
  status: 'completed',
  thumb: 'certificates/thumbnails/name.png',
  pdf: 'certificates/name.pdf',
  featured: false,
}
```

Categories for both are defined at the top of `data.js` (`PROJECT_CATEGORIES` / `CERT_CATEGORIES`) — filter pills render automatically and hide themselves when empty.

## 🚀 Running Locally

No build step needed:

```bash
git clone https://github.com/BlazeO8/websitetoportfolio.git
cd websitetoportfolio
# then just open index.html in a browser, or serve it:
python -m http.server 8000
```

Visit `http://localhost:8000`.

## 📄 License

Personal portfolio — feel free to reference the structure, but please don't republish the content as your own.

## 📬 Contact

Built and maintained by **Kartik Jindal**. Reach out via the links on the [live site](https://blazeo8.github.io/websitetoportfolio/).
