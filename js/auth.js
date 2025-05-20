import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";


const SECRETS_PATH = "./secrets.json";
const SECRETS_REQ = new Request(SECRETS_PATH);
const SECRETS_RES = await fetch(SECRETS_REQ);
const SECRETS = await SECRETS_RES.json();


export const firebaseConfig = SECRETS.firebaseConfig;


initializeApp(firebaseConfig);
const AUTH = getAuth();


// Create user function
export function createUser(email, password) {
  createUserWithEmailAndPassword(AUTH, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User created successfully:", user);
    })
    .catch((error) => {
      console.error(`Error creating user: ${error.code}`, error.message);
    });
}


export function signIn(email, password) {
  signInWithEmailAndPassword(AUTH, email, password)
    .then((userCredential) => {
      // Signed in successfully
      const USER = userCredential.user;
      console.log("Login successful:", USER.email);
      alert("Login Successful");
      window.location.replace("index.html"); // Redirect to homepage or dashboard
    })
    .catch((error) => {
      console.error("Error signing in:", error.code, error.message);


      // Optional: more specific error messages
      if (error.code === "auth/user-not-found") {
        alert("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password.");
      } else {
        alert("Error Signing in. Please check your email and password.");
      }
    });
}




// Sign out function
export function signOutUser() {
  signOut(AUTH)
    .then(() => {
      console.log("User signed out.");
      window.location.replace("login.html");
    })
    .catch((error) => {
      console.error("Error signing out:", error.code, error.message);
      alert("Error signing out. Please try again.");
    });
}


export function getCurrentUser(thing) {
  return AUTH.user;
}


// Monitor auth state
onAuthStateChanged(AUTH, (user) => {
  if (user) {
    // If on login page, redirect to app
    if (window.location.pathname.includes("login.html")) {
      window.location.replace("index.html");
    }
  } else {
    // If on app page, redirect to login
    if (!window.location.pathname.includes("login.html")) {
      window.location.replace("login.html");
    }
  }
});
