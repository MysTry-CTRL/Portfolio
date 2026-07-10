// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendEmailVerification,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Keep this outside of any functions or event wrappers so it can be exported!
const firebaseConfig = {
    apiKey: "AIzaSyCFBX3_PsFVBIAbCF9PPB_vcc-BmzOjD9w",
    authDomain: "a-b-i-r.firebaseapp.com",
    projectId: "a-b-i-r",
    storageBucket: "a-b-i-r.firebasestorage.app",
    messagingSenderId: "169785934672",
    appId: "1:169785934672:web:f6c7b3d2cc9469b39e2255"
};

// Initialize Firebase Core globally within this file
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export everything clean and clear for script.js to grab
export { 
    auth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendEmailVerification,
    onAuthStateChanged,
    signOut 
};