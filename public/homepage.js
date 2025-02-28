    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
    import { 
        getAuth,
        signInWithPopup,
        GoogleAuthProvider,
        GithubAuthProvider,
        TwitterAuthProvider
    } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

        // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAZ0uvPU7e2lHGBpBQSfQYMOrrbmHmisMU",
        authDomain: "quiverby-bma.firebaseapp.com",
        projectId: "quiverby-bma",  
        storageBucket: "quiverby-bma.firebasestorage.app",
        messagingSenderId: "545637166421",
        appId: "1:545637166421:web:23159d1d3bb4b22ac353dc"
    };

        // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Retrieve user data from localStorage

const user = JSON.parse(localStorage.getItem("user"));

// Select elements
let welcomeUser = document.getElementsByClassName('welcometxt')[0]; // Ensure it's the first element
let usernameElement = document.getElementById('username'); // Get the element, not its value
let userImg = document.getElementsByClassName('userimg')[0]; // Ensure it's an <img> tag

// Ensure elements exist before modifying them
if (welcomeUser && userImg) {
    // Check if user data is available
    if (user) {
        welcomeUser.innerHTML = "Welcome, " + (user.displayName || "User"); // Google sign-in provides displayName
        userImg.src = user.photoURL || "https://via.placeholder.com/150"; // Show profile picture or default image
    } 
    else if (usernameElement && usernameElement.value) {
        welcomeUser.innerHTML = "Welcome, " + usernameElement.value; // Use the entered username
        userImg.src = "https://via.placeholder.com/150"; // Default image
    } 
    else {
        welcomeUser.innerHTML = "Welcome!";
        userImg.src = "https://via.placeholder.com/150"; // Generic default image
    }
    } else {
        console.error("Error: Missing required elements!");
    }