// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfBGD1bDxE2IMnssjqjOqEalp3Ckx1K34",
  authDomain: "clone-ce7ce.firebaseapp.com",
  projectId: "clone-ce7ce",
  storageBucket: "clone-ce7ce.firebasestorage.app",
  messagingSenderId: "81318115823",
  appId: "1:81318115823:web:dca8d93e7361eeba619e1a",
  measurementId: "G-DD86VMQ9MR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Auth and Database
export const auth = getAuth(app);
export const db = getFirestore(app);