// Import the Firebase functions we need
// ==========================================================================
// 1. ADMIN DASHBOARD AUTHENTICATION LAYER
// ==========================================================================
const loginForm = document.getElementById('adminLoginForm');
const secureDashboard = document.getElementById('secureDashboard');
const loginWall = document.getElementById('loginWall');
const errorDisplay = document.getElementById('loginError');

// Track if you are securely signed in and verified
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (user.emailVerified) {
            // SUCCESS: Device session is active and email link was clicked
            if (loginWall) loginWall.style.display = "none";
            if (secureDashboard) secureDashboard.style.display = "block";
        } else {
            if (errorDisplay) {
                errorDisplay.textContent = "Security Notice: Please click the verification link sent to your email.";
                errorDisplay.style.display = "block";
            }
        }
    }
});

if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;

        try {
            // --- OPTION A: ONE-TIME REGISTRATION ---
            // Uncomment the lines below THE VERY FIRST TIME to create your account, then comment it out again!
            
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(auth.currentUser);
            alert("Verification email dispatched! Check your inbox.");
            return;
            

            // --- OPTION B: SECURE LOGIN ---
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            if (!userCredential.user.emailVerified) {
                await sendEmailVerification(auth.currentUser); // Re-send link if they forgot
                throw new Error("Email not verified yet. A fresh verification link has been sent.");
            }

        } catch (error) {
            if (errorDisplay) {
                errorDisplay.textContent = error.message;
                errorDisplay.style.display = "block";
            }
        }
    });
}

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

// Wait for the page structure to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Select all instances of the CV button on the page
    const cvButtons = document.querySelectorAll('.cv-button');

    cvButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            
            // Path to your PDF file in the project folder
            const cvPath = 'Abir_CV.pdf'; 
            
            // Open the PDF in browser's integrated PDF viewer
            window.open(cvPath, '_blank');
        });
    });
});