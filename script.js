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