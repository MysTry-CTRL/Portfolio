document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. ADMIN DASHBOARD AUTHENTICATION LAYER
    // ==========================================================================
    const loginForm = document.getElementById('adminLoginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Only runs if the user is currently on the dashboard page
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const email = document.getElementById('adminEmail').value;
            const password = document.getElementById('adminPassword').value;
            const captchaBox = document.getElementById('captchaBox');
            const errorDisplay = document.getElementById('loginError');

            // Defensive Check: Make sure captchaBox exists before checking if it is checked
            if (captchaBox && !captchaBox.checked) {
                if (errorDisplay) {
                    errorDisplay.textContent = "Security clearance failed: Check 'I'm not a robot'.";
                    errorDisplay.style.display = "block";
                }
                return;
            }

            // Secret authentication parameters
            if (email === "abirxxdbrine2024@gmail.com" && password === "#youtuber#69#") {
                const loginWall = document.getElementById('loginWall');
                const secureDashboard = document.getElementById('secureDashboard');
                
                if (loginWall) loginWall.style.display = "none";
                if (secureDashboard) secureDashboard.style.display = "block";
            } else {
                if (errorDisplay) {
                    errorDisplay.textContent = "Invalid access credentials supplied.";
                    errorDisplay.style.display = "block";
                }
            }
        });
    }

    // Handle Session Logout command link button click
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.reload();
        });
    }

});

// ==========================================================================
    // 2. PRO-MODE CONTACT FORM ASYNCHRONOUS SUBMISSION
    // ==========================================================================
    const dynamicForm = document.querySelector('.contact-form');

    if (dynamicForm) {
        dynamicForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Stop page from flashing/reloading

            const submitBtn = dynamicForm.querySelector('button[type="submit"]');
            const successNotice = dynamicForm.querySelector('.form-success');
            const errorNotice = dynamicForm.querySelector('.form-error');

            // Collect text inputs safely
            const dataPayload = new FormData(dynamicForm);

            // Set loading state UI
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            if (successNotice) successNotice.style.display = "none";
            if (errorNotice) errorNotice.style.display = "none";

            try {
                const connectivityCheck = await fetch(dynamicForm.action, {
                    method: dynamicForm.method,
                    body: dataPayload,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (connectivityCheck.ok) {
                    if (successNotice) successNotice.style.display = "block";
                    dynamicForm.reset(); // Wipe the inputs clean
                } else {
                    if (errorNotice) errorNotice.style.display = "block";
                }
            } catch (networkError) {
                if (errorNotice) errorNotice.style.display = "block";
            } finally {
                // Restore button state
                submitBtn.textContent = "Send Message";
                submitBtn.disabled = false;
            }
        });
    }