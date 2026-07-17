# A.B.I.R | Beyond Ordinary

A modern, responsive portfolio website showcasing projects, skills, and services. Built with HTML5, CSS3, and vanilla JavaScript with Firebase authentication for admin features.

## 🌟 Features

- **Responsive Design** - Mobile-first approach, optimized for all devices
- **Dark/Light Theme** - User preference-based theme switching with localStorage
- **Custom Context Menu** - Right-click custom menu for navigation
- **Live Clock** - Real-time clock display in context menu
- **Background Music** - Optional ambient music toggle
- **Admin Dashboard** - Firebase-authenticated admin control panel
- **Toast Notifications** - Non-intrusive user feedback system
- **Modern UI** - Aquamarine accent colors with dark theme
- **Performance Optimized** - Clean code, minimal dependencies

## 📁 Project Structure

```
Portfolio/
├── index.html          # Home page
├── about.html          # About me page
├── projects.html       # Projects showcase
├── contact.html        # Contact form with Formspree
├── partner.html        # Partners listing
├── dashboard.html      # Admin control panel
├── style.css           # Main stylesheet
├── script.js           # Client-side JavaScript
├── firebase.js         # Firebase authentication module
└── README.md           # This file
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Firebase Authentication, Formspree (forms)
- **Hosting**: Vercel, Netlify
- **Icons**: Font Awesome 6.7.2
- **Fonts**: Montenegrin Gothic One (Google Fonts)

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Git (optional)

### Installation

1. Clone or download the repository
```bash
git clone <repository-url>
cd Portfolio
```

2. Open `index.html` in your browser
```bash
# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

### Configuration

**Update GitHub Link** in context menu:
- Open `index.html`
- Find: `window.open('https://github.com/MysTry-CTRL','_blank')`
- Replace `MysTry-CTRL` with your GitHub profile

**Update Contact Form** in `contact.html`:
- Replace Formspree endpoint if needed
- Update email address in form action

## 📝 Customization

### Colors
Edit `style.css` to change the accent color (#4fffd2) throughout:
- Hover states: #2fe0b1
- Primary: #4fffd2
- Background: #000000 to #111111

### Content
- Update HTML pages with your information
- Replace images with your own
- Update project links and descriptions

## ⚙️ Features Explained

### Dark/Light Theme
- Persisted in localStorage
- User preference is remembered
- CSS uses `data-theme` attribute

### Custom Context Menu
- Right-click anywhere (except inputs)
- Navigation, utilities, and quick actions
- Keyboard support (Escape to close)

### Toast Notifications
- Non-blocking feedback
- Auto-dismiss after 2.2 seconds
- Used for: copy, theme toggle, music control

### Admin Dashboard
- Firebase authentication required
- Secure login with email/password
- Captcha verification
- View analytics and metrics

## 🔐 Security Notes

- Firebase credentials are client-side (public)
- Admin authentication protects dashboard only
- Always validate user inputs server-side
- Consider environment variables for production

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

Improvements and suggestions are welcome. Feel free to submit issues or pull requests.

## 📄 License

This project is personal portfolio work. All rights reserved.

## 👤 Author

**Abir Biswas** (MysTry)
- [Portfolio](https://portfolio.example.com)
- [GitHub](https://github.com/MysTry-CTRL)
- [Email](mailto:abir@example.com)

---

**Version**: 2.0 | **Last Updated**: 2026-07-17