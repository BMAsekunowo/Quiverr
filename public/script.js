
const toggleForm = () => {
    let container = document.getElementById('container');
    let signInForm = document.getElementById('sign-in');
    let signUpForm = document.getElementById('sign-up');
    let animePanel = document.getElementById('animation-panel');
    let formPanel = document.getElementById('form-panel');
    
    let deviceWidth = window.innerWidth; // Get device screen width

    if (deviceWidth <= 900 && (signUpForm.style.display === "none" || signUpForm.style.display === "")) {
        container.style.maxWidth = "900px";
        signInForm.style.display = "none";
        signUpForm.style.display = "block";
        animePanel.style.transform = "translateY(-100%)";  //˿ This basically makes the panels exchange position up-down.
        formPanel.style.transform = "translateY(100%)";


    } else if (deviceWidth > 900 && (signUpForm.style.display === "none" || signUpForm.style.display === "")) {
        signInForm.style.display = "none";
        signUpForm.style.display = "block";
        animePanel.style.transform = "translateX(-100%)";  //˿ This basically makes the panels exchange position left-right.
        formPanel.style.transform = "translateX(100%)";

    } else {
        signInForm.style.display = "block";
        signUpForm.style.display = "none";
        animePanel.style.transform = "translate(0%, 0%)"; //˿ This basically makes the panels retain their original position.
        formPanel.style.transform = "translate(0%, 0%)";
    }
}

window.toggleForm = toggleForm;


    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
        import { 
            getAuth,
            signInWithPopup,
            GoogleAuthProvider,
            GithubAuthProvider,
            TwitterAuthProvider
        } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

        import { 
            getFirestore,
            doc,
            setDoc
        } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

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
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        const db = getFirestore(app);

        export { auth, db };

        // Google Sign-in
        const signGoogle = () => {
            signInWithPopup(auth, provider)
            .then((result) => {
                let userlogincred = result.user;
                console.log("✅ User signed in with Google: ", userlogincred);
                localStorage.setItem("user", JSON.stringify(userlogincred));
                window.location.href = "homepage.html";
            }).catch((error) => {
                console.error("Error:", error.code, error.message, error.customData?.email);
                console.log(GoogleAuthProvider.credentialFromError(error));
            });
        }
        window.signGoogle = signGoogle;
                
            // GitHub Sign-in
        const signGitHub = () => {
            const githubProvider = new GithubAuthProvider();
            
            signInWithPopup(auth, githubProvider)
            .then((result) => {
                let userlogincred = result.user;
                console.log("✅ User signed in with GitHub: ", userlogincred);
            }).catch((error) => {
                console.error("Error:", error.code, error.message, error.customData?.email);
                console.log(GithubAuthProvider.credentialFromError(error));
            });
        }
        window.signGitHub = signGitHub;

            // Twitter Sign-in
        const signTwitter = () => {
            const twitterProvider = new TwitterAuthProvider();
            
            signInWithPopup(auth, twitterProvider)
            .then((result) => {
                let userlogincred = result.user;
                console.log("✅ User signed in with Twitter: ", userlogincred);
            }).catch((error) => {
                console.error("Error:", error.code, error.message, error.customData?.email);
                console.log(TwitterAuthProvider.credentialFromError(error));
            });
        }
        window.signTwitter = signTwitter;