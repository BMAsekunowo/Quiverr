
    function toggleForm() {
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


// function buttonTest() {
//         let butTest = document.getElementById('google-signin');
//         console.log('I am working Perfectly with this function --Google');
//     }

// function buttonTest2() {
//         let butTest2 = document.getElementById('twitter-signin');
//         console.log('I am working Perfectly with this function --Twitter');
//     }

// function buttonTest3() {
//         let butTest3 = document.getElementById('github-signin');
//         console.log('I am working Perfectly with this function --Github');
//     }


