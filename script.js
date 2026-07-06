document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. DYNAMIC AGE UPDATER LAYER
    // ==========================================================================
    const ageElement = document.getElementById('my-age');
    
    if (ageElement) {
        const birthDate = new Date('2011-08-06'); // Year-Month-Day
        const today = new Date();
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();
        
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }
        
        ageElement.textContent = age;
    }

    // ==========================================================================
    // 2. ADMIN DASHBOARD AUTHENTICATION LAYER
    // ==========================================================================
    const loginForm = document.getElementById('adminLoginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Only runs if the user is currently on the dashboard page
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const email = document.getElementById('adminEmail').value;
            const password = document.getElementById('adminPassword').value;
            const isNotRobot = document.getElementById('captchaBox').checked;
            const errorDisplay = document.getElementById('loginError');

            // Bot check confirmation validation
            if (!isNotRobot) {
                errorDisplay.textContent = "Security clearance failed: Check 'I'm not a robot'.";
                errorDisplay.style.display = "block";
                return;
            }

            // Secret authentication parameters
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