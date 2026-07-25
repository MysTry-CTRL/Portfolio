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