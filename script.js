// Wait for the HTML elements to load fully into memory
document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('adminLoginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Handle Form Authentication submission event
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const email = document.getElementById('adminEmail').value;
            const password = document.getElementById('adminPassword').value;
            const isNotRobot = document.getElementById('captchaBox').checked;
            const errorDisplay = document.getElementById('loginError');

            // 1. Bot check confirmation validation
            if (!isNotRobot) {
                errorDisplay.textContent = "Security clearance failed: Check 'I'm not a robot'.";
                errorDisplay.style.display = "block";
                return;
            }

            // 2. Secret authentication parameters
            if (email === "abirxxdbrine2024@gmail.com" && password === "#youtuber#69#") {
                document.getElementById('loginWall').style.display = "none";
                document.getElementById('secureDashboard').style.display = "block";
            } else {
                errorDisplay.textContent = "Invalid access credentials supplied.";
                errorDisplay.style.display = "block";
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