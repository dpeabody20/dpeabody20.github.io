import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

    const firebaseConfig = {
        apiKey: "AIzaSyD-B2IdK89N1NaCFfUjC4w74sh6qeSTB8Y",
        authDomain: "ga-performance-calculator.firebaseapp.com",
        projectId: "ga-performance-calculator",
        storageBucket: "ga-performance-calculator.firebasestorage.app",
        messagingSenderId: "674748425103",
        appId: "1:674748425103:web:d5241b2f2a66551a42a1fa"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Firebase Authentication
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        //console.log(email);
      } else {
        //user signed out
      }
    });

    //logout
    function buttonSignOut(){
      signOut(auth).then(() => {
        window.location.href = "login.html";
      }).catch((error) => {
        // An error happened.
      });
    };