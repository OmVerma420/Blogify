import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getEnv } from "./getEnv.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "blog-3d281.firebaseapp.com",
  projectId: "blog-3d281",
  storageBucket: "blog-3d281.firebasestorage.app",
  messagingSenderId: "167717405030",
  appId: "1:167717405030:web:6f284725422a5e121688a7",
  measurementId: "G-0NBLFHRH1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth , provider };