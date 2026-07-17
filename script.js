/* ==========================================
   CONSTANTS
========================================== */

const TOAST_DURATION = 2200;
const TOAST_OFFSET = 20;
const MENU_PADDING = 10;
const KEYBOARD_ESCAPE = "Escape";
const SMOOTH_SCROLL = "smooth";
const STORAGE_THEME_KEY = "theme";
const THEME_DARK = "dark";
const THEME_LIGHT = "light";

/* ==========================================
   CUSTOM CONTEXT MENU
========================================== */

const menu = document.getElementById("context-menu");

document.addEventListener("contextmenu", (e) => {
    // Allow context menu for input and textarea elements
    if (e.target.closest("input") || e.target.closest("textarea")) {
        return;
    }

    e.preventDefault();

    let x = e.clientX;
    let y = e.clientY;

    menu.classList.add("active");

    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;

    // Prevent menu from going off-screen horizontally
    if (x + menuWidth > window.innerWidth) {
        x = window.innerWidth - menuWidth - MENU_PADDING;
    }

    // Prevent menu from going off-screen vertically
    if (y + menuHeight > window.innerHeight) {
        y = window.innerHeight - menuHeight - MENU_PADDING;
    }

    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
});

document.addEventListener("click", () => {
    menu.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
    if (e.key === KEYBOARD_ESCAPE) {
        menu.classList.remove("active");
    }
});

window.addEventListener("resize", () => {
    menu.classList.remove("active");
});

/* ==========================================
   MENU ACTIONS
========================================== */

document.querySelectorAll(".context-item").forEach(item => {
    item.addEventListener("click", () => {
        const action = item.dataset.action;

        switch (action) {
            case "home":
                location.href = "index.html";
                break;

            case "about":
                location.href = "about.html";
                break;

            case "projects":
                location.href = "projects.html";
                break;

            case "contact":
                location.href = "contact.html";
                break;

            case "copy":
                navigator.clipboard.writeText(location.href);
                showToast("📋 Portfolio link copied!");
                break;

            case "top":
                window.scrollTo({
                    top: 0,
                    behavior: SMOOTH_SCROLL
                });
                break;

            case "refresh":
                location.reload();
                break;
        }

        menu.classList.remove("active");
    });
});

/* ==========================================
   LIVE CLOCK
========================================== */

const contextTime = document.getElementById("contextTime");

function updateContextClock() {
    if (!contextTime) return;

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const date = now.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric"
    });

    contextTime.textContent = `${time} • ${date} • Portfolio v2.0`;
}

updateContextClock();
setInterval(updateContextClock, 1000);

/* ==========================================
   THEME MANAGER
========================================== */

const body = document.body;
const themeButton = document.getElementById("themeBtn");

// Load saved theme or default to dark
const savedTheme = localStorage.getItem(STORAGE_THEME_KEY) || THEME_DARK;
body.dataset.theme = savedTheme;
updateThemeButton();

themeButton?.addEventListener("click", () => {
    const current = body.dataset.theme;
    const newTheme = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;

    body.dataset.theme = newTheme;
    localStorage.setItem(STORAGE_THEME_KEY, newTheme);
    updateThemeButton();

    const message = newTheme === THEME_DARK ? "🌙 Dark Theme Enabled" : "☀️ Light Theme Enabled";
    showToast(message);
});

function updateThemeButton() {
    if (!themeButton) return;

    const icon = themeButton.querySelector("i");
    const text = themeButton.querySelector("span");

    if (body.dataset.theme === THEME_DARK) {
        icon.className = "fa-solid fa-sun";
        text.textContent = "Switch to Light Theme";
    } else {
        icon.className = "fa-solid fa-moon";
        text.textContent = "Switch to Dark Theme";
    }
}

/* ==========================================
   BACKGROUND MUSIC
========================================== */

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicBtn");

musicButton?.addEventListener("click", () => {
    if (!music) return;

    const icon = musicButton.querySelector("i");
    const text = musicButton.querySelector("span");

    if (music.paused) {
        music.play();
        icon.className = "fa-solid fa-pause";
        text.textContent = "Pause Background Music";
        showToast("🎵 Music Playing");
    } else {
        music.pause();
        icon.className = "fa-solid fa-music";
        text.textContent = "Play Background Music";
        showToast("⏸ Music Paused");
    }
});

/* ==========================================
   TOAST NOTIFICATION
========================================== */

function showToast(message) {
    let toast = document.getElementById("portfolio-toast");

    // Create toast element if it doesn't exist
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "portfolio-toast";
        document.body.appendChild(toast);

        Object.assign(toast.style, {
            position: "fixed",
            right: `${TOAST_OFFSET}px`,
            bottom: `${TOAST_OFFSET}px`,
            padding: "14px 20px",
            borderRadius: "10px",
            background: "rgba(20, 20, 20, 0.9)",
            border: "1px solid rgba(79, 255, 210, 0.3)",
            backdropFilter: "blur(18px)",
            color: "#fff",
            fontFamily: "inherit",
            zIndex: "999999",
            transition: "0.3s",
            opacity: "0",
            transform: "translateY(20px)"
        });
    }

    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    // Clear existing timeout
    clearTimeout(toast.timer);

    // Auto-hide toast after duration
    toast.timer = setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
    }, TOAST_DURATION);
}