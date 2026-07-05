/* ============================================================
   SITE DATA — add new projects/certificates here only.
   No HTML editing needed for new entries.
   ============================================================ */

// ---------- CATEGORY DEFINITIONS ----------
const CERT_CATEGORIES = [
  { id: 'ai-ml',       label: 'AI / ML',                icon: '🤖' },
  { id: 'language',    label: 'Programming Languages',   icon: '💻' },
  { id: 'networking',  label: 'Networking & Security',   icon: '🌐' },
  { id: 'other',       label: 'Other',                   icon: '📁' },
];

const PROJECT_CATEGORIES = [
  { id: 'web',      label: 'Web',              icon: '🌐' },
  { id: 'game',     label: 'Games',            icon: '🎮' },
  { id: 'database', label: 'Database',         icon: '🗄️' },
  { id: 'ai-ml',    label: 'AI / ML',          icon: '🤖' },
  { id: 'finance',  label: 'Finance / Trading', icon: '💹' },
  { id: 'other',    label: 'Other',            icon: '📁' },
];

// ---------- CERTIFICATES ----------
// status: 'completed' | 'in-progress'
const CERTIFICATES = [
  // Featured / existing
  { title: 'Advance AI Skill', issuer: 'Outskill', category: 'ai-ml', status: 'completed', thumb: 'certificates/thumbnails/ai.png', pdf: 'certificates/ai.pdf', featured: true },
  { title: 'Python', issuer: 'DataFlair', category: 'language', status: 'completed', thumb: 'certificates/thumbnails/python.png', pdf: 'certificates/python.pdf', featured: true },
  { title: 'C Programming Part 1', issuer: 'Coursera', category: 'language', status: 'completed', thumb: 'certificates/thumbnails/c1.png', pdf: 'certificates/c1.pdf', featured: false },
  { title: 'C Programming Part 2', issuer: 'Coursera', category: 'language', status: 'completed', thumb: 'certificates/thumbnails/c2.png', pdf: 'certificates/c2.pdf', featured: false },
  { title: 'C++ Programming', issuer: 'Coursera', category: 'language', status: 'completed', thumb: 'certificates/thumbnails/cpp.png', pdf: 'certificates/cpp.pdf', featured: false },
  { title: 'Networking & Cybersecurity', issuer: 'Ducat', category: 'networking', status: 'completed', thumb: 'certificates/thumbnails/networking.png', pdf: 'certificates/networking.pdf', featured: true },

  // Anthropic Academy — completed
  { title: 'Claude 101', issuer: 'Anthropic', category: 'ai-ml', status: 'completed', thumb: 'certificates/thumbnails/claude-101.png', pdf: 'certificates/anthropic/claude-101.pdf', featured: true },
  { title: 'Claude Code 101', issuer: 'Anthropic', category: 'ai-ml', status: 'completed', thumb: 'certificates/thumbnails/claude-code-101.png', pdf: 'certificates/anthropic/claude-code-101.pdf', featured: false },
  { title: 'Claude Platform 101', issuer: 'Anthropic', category: 'ai-ml', status: 'completed', thumb: 'certificates/thumbnails/claude-platform-101.png', pdf: 'certificates/anthropic/claude-platform-101.pdf', featured: false },

  // Anthropic Academy — in progress (course catalog: anthropic.skilljar.com)
  { title: 'Introduction to Claude Cowork', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/introduction-to-claude-cowork' },
  { title: 'Claude Code in Action', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/claude-code-in-action' },
  { title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/ai-fluency-framework-foundations' },
  { title: 'Building with the Claude API', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/claude-with-the-anthropic-api' },
  { title: 'Introduction to Model Context Protocol', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/introduction-to-model-context-protocol' },
  { title: 'AI Fluency for Educators', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/ai-fluency-for-educators' },
  { title: 'AI Fluency for Students', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/ai-fluency-for-students' },
  { title: 'Model Context Protocol: Advanced Topics', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/model-context-protocol-advanced-topics' },
  { title: 'Claude with Amazon Bedrock', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/claude-in-amazon-bedrock' },
  { title: "Claude with Google Cloud's Vertex AI", issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/claude-with-google-vertex' },
  { title: 'Teaching AI Fluency', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/teaching-ai-fluency' },
  { title: 'AI Fluency for Nonprofits', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/ai-fluency-for-nonprofits' },
  { title: 'Introduction to Agent Skills', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/introduction-to-agent-skills' },
  { title: 'Introduction to Subagents', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/introduction-to-subagents' },
  { title: 'AI Capabilities and Limitations', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/ai-capabilities-and-limitations' },
  { title: 'AI Fluency for Small Businesses', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/ai-fluency-for-small-businesses' },
  { title: 'AI Fluency for Builders', issuer: 'Anthropic', category: 'ai-ml', status: 'in-progress', courseUrl: 'https://anthropic.skilljar.com/ai-fluency-for-builders' },
];

// ---------- PROJECTS ----------
const PROJECTS = [
  {
    title: 'Portfolio Website',
    desc: 'Modern portfolio built with HTML/CSS/JS featuring canvas particles, glassmorphism, animated skill bars, and certificate showcase with PDF downloads.',
    icon: '🌐', category: 'web', featured: true,
    tags: ['HTML/CSS/JS', 'Canvas Animation', 'Responsive'],
    grad: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
    link: 'https://github.com/BlazeO8/websitetoportfolio',
  },
  {
    title: 'GTA: Pixel City',
    desc: 'Interactive top-down action game with vehicle physics, weapon system (Pistol, Rifle, Shotgun, Minigun), NPC AI, dynamic wanted level, and mission system.',
    icon: '🎮', category: 'game', featured: true,
    tags: ['JavaScript', 'Canvas API', 'Game Dev'],
    grad: 'linear-gradient(135deg,#0ea5e9,#06b6d4)',
    link: 'https://github.com/BlazeO8/pixel-city-game',
    playable: true,
  },
  {
    title: 'B.L.A.Z.E — Personalized AI Agent',
    desc: "A fully local, privacy-first personal AI assistant powered by Groq's Llama 3.3 70B. Controls your system, sets reminders, checks weather/news, and learns your habits — with both a desktop GUI and a browser-based web UI.",
    icon: '🧠', category: 'ai-ml', featured: true,
    tags: ['Python', 'FastAPI', 'Groq/Llama 3.3', 'SQLite'],
    grad: 'linear-gradient(135deg,#8b5cf6,#ec4899)',
    link: 'https://github.com/BlazeO8/B.L.A.Z.E-personalized-AI-agent',
  },
  {
    title: 'Binance Futures Trading Bot',
    desc: 'A CLI trading bot for Binance Futures Testnet supporting Market, Limit, and Stop-Limit orders, with input validation, structured error handling, and rotating request/response logs.',
    icon: '💹', category: 'finance', featured: false,
    tags: ['Python', 'python-binance', 'CLI'],
    grad: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    link: 'https://github.com/BlazeO8/trading-bot-binance',
  },
  {
    title: 'Special Obby',
    desc: 'A parkour obstacle-course game built and published on Roblox using Lua scripting.',
    icon: '🧱', category: 'game', featured: false,
    tags: ['Roblox', 'Lua', 'Game Dev'],
    grad: 'linear-gradient(135deg,#22c55e,#0ea5e9)',
    link: 'https://www.roblox.com/games/12171252028/special-obby',
  },
];
