
    const toggleForm = () => {
        let container = document.getElementById('container');
        let signInForm = document.getElementById('sign-in');
        let signUpForm = document.getElementById('sign-up');
        let animePanel = document.getElementById('animation-panel');
        let formPanel = document.getElementById('form-panel');

        if (signUpForm.style.display === "none" || signUpForm.style.display === "") {
            signInForm.style.display = "none";
            signUpForm.style.display = "block";
            animePanel.style.transform = "translateX(-100%)";  // ← This makes the panels exchange positions.
            formPanel.style.transform = "translateX(100%)";
        } else {
            signInForm.style.display = "block";
            signUpForm.style.display = "none";
            animePanel.style.transform = "translateX(0%)"; // ← This basically leaves the panels in their original position.
            formPanel.style.transform = "translateX(0%)";
        }
    }
    window.toggleForm = toggleForm


    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
        import { 
            getAuth,
            signInWithPopup,
            GoogleAuthProvider,
            GithubAuthProvider,
            TwitterAuthProvider,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword
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
                console.log("✅ User signed in: ", userlogincred);
            }).catch((error) => {
                console.error("Error:", error.code, error.message, error.customData?.email);
                console.log(GoogleAuthProvider.credentialFromError(error));
            });
        }
        window.signGoogle = signGoogle;

        const showMessage = (message,divId) => {
            let messageDiv = document.getElementsByName("divId");
            messageDiv.style.display ="block";
            messageDiv.InnerHTML = message;
            messageDiv.style.opacity = 1;
            setTimeout(function(){
                messageDiv.style.opacity = 0;
            },5000);
        }


            // Signup with Email and Password
        const signUpEmail = () => {
            let email = document.getElementById("remail").value;
            let password = document.getElementById("rpassword").value;
            let username = document.getElementById("username").value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    let newuser = userCredential.user;
                    userData = {
                        username: username,
                        email: email,
                        password: password
                    }

                    showMessage('Account Created Successfully');
                    
                    const docREf = doc(db, "users", newuser.uid);
                    setDoc(docREf,userData)

                })

                .then(() => {
                    window.location.href = "home.html";
                })

                .catch((error) => {
                    const errorCode =error.code;

                    if (errorCode == 'auth/email-already-in-use'){
                        showMessage('Email Already In Use!!!, Sign In instead', 'signUpMessage');
                    }

                    else {
                        showMessage('Unable to Sign Up', 'signUpMessage');
                    }
                })
        };
        window.signUpEmail = signUpEmail;
                
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