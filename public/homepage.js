 // Retrieve user data from localStorage

const user = JSON.parse(localStorage.getItem(user));

// Select elements
let displayName = document.getElementsByClassName('display-name')[0]; // Ensure it's the first element
let usernameElement = document.getElementById('username'); // Get the element, not its value
let userImg = document.getElementsByClassName('profile-img')[0]; // Ensure it's an <img> tag

// Ensure elements exist before modifying them
if (welcomeUser && userImg) {
    // Check if user data is available
    if (user) {
        displayName.innerHTML = "Welcome, " + (user.displayName || "User"); // Google sign-in provides displayName
        userImg.src = user.photoURL || "https://via.placeholder.com/150"; // Show profile picture or default image
    } 
    else if (usernameElement && usernameElement.value) {
        displayName.innerHTML = "Welcome, " + usernameElement.value; // Use the entered username
        userImg.src = "https://via.placeholder.com/150"; // Default image
    } 
    else {
        displayName.innerHTML = "Welcome!";
        userImg.src = "https://via.placeholder.com/150"; // Generic default image
    }
    } else {
        console.error("Error: Missing required elements!");
}


