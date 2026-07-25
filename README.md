cat <<'EOF' > README.md
<div align="center">

# ⚡ A.B.I.R | Beyond Ordinary

**A sleek, ultra-responsive, glassmorphic portfolio & client service web platform.**

[![Version](https://img.shields.io/badge/Release-v9.0-4fffd2?style=for-the-badge&logo=github)](https://github.com/MysTry-CTRL)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Built With](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS-orange?style=for-the-badge)](https://developer.mozilla.org/)

</div>

---

# 🌟 Overview

**A.B.I.R Portfolio** is a feature-rich multi-page static web application built with high performance, accessibility, and modern aesthetic design principles in mind. Styled with a custom **dark glassmorphism** UI, ambient audio integration, adaptive mobile menu systems, dynamic context action menus, and client service showcases.

---

# 🔥 Key Features

- 🎨 **Dark Glassmorphic UI**
  - Frosted glass aesthetics
  - Aquamarine neon accents (`#4fffd2`)
  - Smooth animations

- 📱 **Adaptive Mobile Layouts**
  - Responsive typography below `700px`
  - Compact icon-based topbar
  - Disabled tap highlights
  - Touch-optimized interactions

- 🖱️ **Custom Smart Context Menu**
  - Dynamic section switching
  - Theme toggle
  - Background music controls
  - Refresh page
  - Scroll to top
  - Copy link utility

- 🎵 **Ambient Audio Engine**
  - Persistent background music playback

- 💼 **Clients & Collaborators Hub**
  - GitHub
  - Vercel
  - Netlify
  - Client project cards
  - Delivery badges

- 🛠️ **PWA Ready**
  - `site.webmanifest`
  - `robots.txt`

- 🚫 **Custom 404 Page**

---

# 📂 Project Structure

```text
PORTFOLIO/
├── assets/
│   ├── audio/
│   │   └── background.mp3
│   └── image/
│       └── Icon_Final (no bg and high qual).png
├── index.html
├── about.html
├── projects.html
├── blog.html
├── contact.html
├── feedback.html
├── partner.html
├── 404.html
├── site.webmanifest
├── robots.txt
├── style.css
├── script.js
├── firebase.js
└── README.md
```

---

# 🛠️ Tech Stack & Utilities

### Frontend
- HTML5
- CSS3 (Flexbox, Grid, Variables, Glassmorphism, Media Queries)

### JavaScript
- Vanilla JavaScript (ES6+)

### Backend Services
- Firebase Authentication
- Firebase Realtime Database
- Formspree

### Icons & Fonts
- Font Awesome 6.7.2
- Google Fonts (Montenegrin Gothic One)

### Deployment
- Netlify
- Vercel
- GitHub Pages

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/MysTry-CTRL/PORTFOLIO.git
cd PORTFOLIO
```

## Run locally

Open `index.html` directly, or use a local server:

```bash
python -m http.server 8000
```

Then visit:

```
http://localhost:8000
```

---

# ⚙️ Configuration

## Update Context Menu Links

Modify the button actions inside `script.js` or the HTML pages.

```html
<button class="context-item"
        onclick="window.open('https://github.com/YOUR-USERNAME','_blank')">
    <i class="fa-brands fa-github"></i>
    <span>Visit GitHub</span>
</button>
```

## Update Web Manifest

Edit `site.webmanifest`:

```json
{
  "name": "A.B.I.R - Developer Portfolio",
  "short_name": "A.B.I.R",
  "theme_color": "#4fffd2",
  "background_color": "#0d0e15"
}
```

---

# 🌐 Browser Compatibility

| Browser | Supported |
|----------|-----------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Apple Safari | 14+ |
| Microsoft Edge | 90+ |
| Mobile Browsers | iOS Safari / Chrome for Android |

---

# 👤 Author & Maintainer

**A.B.I.R (MysTry)**

- GitHub: https://github.com/MysTry-CTRL
- Portfolio: Live Showcase

EOF