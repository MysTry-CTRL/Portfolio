document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. CONTEXT MENU & LINK HANDLING
    // ==========================================
    const menu = document.getElementById("context-menu");
    const groupDefault = document.getElementById("group-default");
    const groupText = document.getElementById("group-text");
    const groupLink = document.getElementById("group-link");

    let currentTargetLink = null;
    let targetParagraph = null;

    if (menu) {
        // Listen for right-clicks
        document.addEventListener("contextmenu", (e) => {
            // Allow native menu on input fields or textareas
            if (e.target.closest("input") || e.target.closest("textarea")) {
                return;
            }

            e.preventDefault();

            const selectedText = window.getSelection().toString().trim();
            const clickedLink = e.target.closest("a");

            // Reset groups visibility
            if (groupDefault) groupDefault.style.display = "none";
            if (groupText) groupText.style.display = "none";
            if (groupLink) groupLink.style.display = "none";

            if (selectedText.length > 0) {
                // Text selection mode
                if (groupText) groupText.style.display = "block";
                targetParagraph = e.target.closest("p, article, span, div") || e.target;
            } else if (clickedLink) {
                // Link mode
                if (groupLink) groupLink.style.display = "block";
                currentTargetLink = clickedLink.href;
            } else {
                // Default mode
                if (groupDefault) groupDefault.style.display = "block";
            }

            // Position Menu
            let x = e.clientX;
            let y = e.clientY;

            menu.classList.add("active");

            const menuWidth = menu.offsetWidth;
            const menuHeight = menu.offsetHeight;

            if (x + menuWidth > window.innerWidth) {
                x = window.innerWidth - menuWidth - 10;
            }
            if (y + menuHeight > window.innerHeight) {
                y = window.innerHeight - menuHeight - 10;
            }

            menu.style.left = `${x}px`;
            menu.style.top = `${y}px`;
        });

        // Close Menu on Click outside
        document.addEventListener("click", (e) => {
            if (!menu.contains(e.target)) {
                menu.classList.remove("active");
            }
        });

        // Action Handlers
        menu.addEventListener("click", (e) => {
            const item = e.target.closest(".context-item");
            if (!item) return;

            const action = item.dataset.action;

            switch (action) {
                // Navigation Actions
                case "home": window.location.href = "index.html"; break;
                case "about": window.location.href = "about.html"; break;
                case "projects": window.location.href = "projects.html"; break;
                case "contact": window.location.href = "contact.html"; break;
                case "top": window.scrollTo({ top: 0, behavior: "smooth" }); break;
                case "refresh": window.location.reload(); break;

                // Copy Actions
                case "copy":
                    navigator.clipboard.writeText(window.location.href);
                    if (typeof showToast === "function") showToast("Portfolio link copied!");
                    break;

                case "copy-text":
                    const text = window.getSelection().toString();
                    navigator.clipboard.writeText(text);
                    if (typeof showToast === "function") showToast("Text copied to clipboard!");
                    break;

                case "select-paragraph":
                    if (targetParagraph) {
                        const range = document.createRange();
                        range.selectNodeContents(targetParagraph);
                        const selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                    break;

                case "copy-link":
                    if (currentTargetLink) {
                        navigator.clipboard.writeText(currentTargetLink);
                        if (typeof showToast === "function") showToast("Link copied to clipboard!");
                    }
                    break;

                // Link Actions
                case "open-new-tab":
                    if (currentTargetLink) window.open(currentTargetLink, "_blank");
                    break;

                case "open-new-window":
                    if (currentTargetLink) {
                        window.open(currentTargetLink, "_blank", "width=1200,height=800,resizable=yes");
                    }
                    break;

                case "open-incognito":
                    if (currentTargetLink) {
                        // Open link in isolated popup window & inform user about browser security limits
                        window.open(currentTargetLink, "_blank", "width=1000,height=700,noreferrer");
                        if (typeof showToast === "function") {
                            showToast("Opened in separate window. Press Ctrl+Shift+N for true Incognito.");
                        }
                    }
                    break;
            }

            menu.classList.remove("active");
        });
    }

    // ==========================================
    // 2. FORMSPREE AJAX SUBMISSION (NO REDIRECT)
    // ==========================================
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector("button[type='submit']");
            const successMsg = contactForm.querySelector(".form-success");
            const errorMsg = contactForm.querySelector(".form-error");

            if (successMsg) successMsg.style.display = "none";
            if (errorMsg) errorMsg.style.display = "none";

            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "SENDING...";
            submitBtn.disabled = true;

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    if (successMsg) successMsg.style.display = "block";
                    contactForm.reset();
                } else {
                    if (errorMsg) errorMsg.style.display = "block";
                }
            } catch (err) {
                console.error("Submission failed:", err);
                if (errorMsg) errorMsg.style.display = "block";
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

// ==========================================
// COMMAND PALETTE INTERACTION LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const cmdOverlay = document.getElementById('cmd-palette-overlay');
    const cmdInput = document.getElementById('cmd-input');
    const cmdList = document.getElementById('cmd-list');
    const cmdItems = document.querySelectorAll('.cmd-item');

    if (!cmdOverlay || !cmdInput) return;

    // Open palette on Ctrl+K or Cmd+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            openPalette();
        } else if (e.key === 'Escape' && cmdOverlay.style.display === 'flex') {
            closePalette();
        }
    });

    // Close on overlay background click
    cmdOverlay.addEventListener('click', (e) => {
        if (e.target === cmdOverlay) closePalette();
    });

    function openPalette() {
        cmdOverlay.style.display = 'flex';
        cmdInput.value = '';
        cmdInput.focus();
        filterItems('');
    }

    function closePalette() {
        cmdOverlay.style.display = 'none';
    }

    // Filter list on search input
    cmdInput.addEventListener('input', (e) => {
        filterItems(e.target.value.toLowerCase().trim());
    });

    function filterItems(query) {
        cmdItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Handle click actions on items
    cmdItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            executeAction(action);
            closePalette();
        });
    });

    function executeAction(action) {
        switch (action) {
            case 'home': window.location.href = 'index.html'; break;
            case 'about': window.location.href = 'about.html'; break;
            case 'skills': window.location.href = 'skills.html'; break;
            case 'cv': window.location.href = 'cv.html'; break;
            case 'projects': window.location.href = 'projects.html'; break;
            case 'contact': window.location.href = 'contact.html'; break;
            case 'github': window.open('https://github.com/MysTry-CTRL', '_blank'); break;
            case 'copy':
                navigator.clipboard.writeText(window.location.origin);
                alert('Portfolio link copied to clipboard!');
                break;
        }
    }
});

// ==========================================
// COMMAND PALETTE INTERACTION LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const cmdOverlay = document.getElementById('cmd-palette-overlay');
    const cmdInput = document.getElementById('cmd-input');
    const cmdList = document.getElementById('cmd-list');
    const cmdItems = document.querySelectorAll('.cmd-item');

    if (!cmdOverlay || !cmdInput) return;

    let selectedIndex = -1;

    // Open palette on Ctrl+K or Cmd+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            openPalette();
        } else if (e.key === 'Escape' && cmdOverlay.style.display === 'flex') {
            closePalette();
        }
    });

    // Close on overlay background click
    cmdOverlay.addEventListener('click', (e) => {
        if (e.target === cmdOverlay) closePalette();
    });

    function openPalette() {
        cmdOverlay.classList.remove('closing');
        cmdOverlay.style.display = 'flex';
        // Force reflow to trigger animation smoothly
        void cmdOverlay.offsetWidth;
        cmdOverlay.classList.add('active');
        
        cmdInput.value = '';
        cmdInput.focus();
        filterItems('');
    }

    function closePalette() {
        cmdOverlay.classList.remove('active');
        cmdOverlay.classList.add('closing');
        
        // Wait for CSS transition (200ms) before removing from display
        setTimeout(() => {
            cmdOverlay.style.display = 'none';
            cmdOverlay.classList.remove('closing');
            selectedIndex = -1;
            clearActiveItems();
        }, 200);
    }

    // Filter list on search input
    cmdInput.addEventListener('input', (e) => {
        filterItems(e.target.value.toLowerCase().trim());
    });

    function filterItems(query) {
        cmdItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Reset selection index when filtering
        selectedIndex = -1;
        clearActiveItems();
        highlightFirstVisible();
    }

    // Keyboard navigation inside input (Arrow Up, Down, Enter)
    cmdInput.addEventListener('keydown', (e) => {
        const visibleItems = Array.from(cmdItems).filter(item => item.style.display !== 'none');
        
        if (visibleItems.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % visibleItems.length;
            updateSelection(visibleItems);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + visibleItems.length) % visibleItems.length;
            updateSelection(visibleItems);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && visibleItems[selectedIndex]) {
                visibleItems[selectedIndex].click();
            } else if (visibleItems.length > 0) {
                visibleItems[0].click();
            }
        }
    });

    function updateSelection(visibleItems) {
        clearActiveItems();
        if (visibleItems[selectedIndex]) {
            visibleItems[selectedIndex].classList.add('active');
            visibleItems[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    function highlightFirstVisible() {
        const visibleItems = Array.from(cmdItems).filter(item => item.style.display !== 'none');
        if (visibleItems.length > 0) {
            selectedIndex = 0;
            visibleItems[0].classList.add('active');
        }
    }

    function clearActiveItems() {
        cmdItems.forEach(item => item.classList.remove('active'));
    }

    // Handle click actions on items
    cmdItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            executeAction(action);
            closePalette();
        });
    });

    function executeAction(action) {
        switch (action) {
            // Internal Navigation
            case 'home': window.location.href = 'index.html'; break;
            case 'about': window.location.href = 'about.html'; break;
            case 'skills': window.location.href = 'skills.html'; break;
            case 'cv': window.location.href = 'cv.html'; break;
            case 'projects': window.location.href = 'projects.html'; break;
            case 'contact': window.location.href = 'contact.html'; break;

            // Social Profiles
            case 'github': window.open('https://github.com/MysTry-CTRL', '_blank'); break;
            case 'youtube': window.open('https://youtube.com/@MysTryReyal', '_blank'); break;
            case 'instagram': window.open('https://instagram.com/_am_i_bisashable_', '_blank'); break;
            case 'tiktok': window.open('https://tiktok.com/@_mystry._.reyal_', '_blank'); break;

            // Utilities
            case 'copy':
                navigator.clipboard.writeText(window.location.origin);
                alert('Portfolio link copied to clipboard!');
                break;
        }
    }
});