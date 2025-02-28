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


// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAD1AOxOh_JgERrENtJHSaGoLRiLfWqAtSkqvfLSBMBSnryPuNYqaW_ev6U1z4ozHi_eFzVxy91JY9CXldBuUZ5F3HbposhazbVRVSFvDWYjr2bZQJYuZPk1g6iwYkGkrlZZQmL8zCqoGUdibo6HiNRxTjEY8THFru881gL1IfTuFSd4I50hTDVtYWXNAH2g6krTY8vdLjhSAEIDsbCdGcI9sF7m8d5dkZNgFhi4DP5z0bjdQPbIrnzMgD6wgJ3Qd3zFuFR4-ljUsEoLTypVr6Xg2AHscFKnJCGWRTc2UeTyantPYTvB77USec3';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);

window.fetchWebApi = fetchWebApi;