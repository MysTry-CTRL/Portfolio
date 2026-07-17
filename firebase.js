/**
 * Firebase Configuration & Authentication Module
 * =============================================
 * Handles Firebase initialization and exports authentication methods
 * for use across the portfolio admin panel.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

/* ==========================================
   FIREBASE CONFIGURATION
========================================== */

const firebaseConfig = {
    apiKey: "AIzaSyCFBX3_PsFVBIAbCF9PPB_vcc-BmzOjD9w",
    authDomain: "a-b-i-r.firebaseapp.com",
    projectId: "a-b-i-r",
    storageBucket: "a-b-i-r.firebasestorage.app",
    messagingSenderId: "169785934672",
    appId: "1:169785934672:web:f6c7b3d2cc9469b39e2255"
};

/* ==========================================
   FIREBASE INITIALIZATION
========================================== */

// Initialize Firebase app instance
const app = initializeApp(firebaseConfig);

// Get authentication instance for admin panel
const auth = getAuth(app);

/* ==========================================
   EXPORTS
========================================== */

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged,
    signOut
};