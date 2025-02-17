// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsGtYeRfKa6XoZPHQpaLMpjdV044fkcuk",
  authDomain: "calorie-auth-b01d4.firebaseapp.com",
  projectId: "calorie-auth-b01d4",
  storageBucket: "calorie-auth-b01d4.appspot.com",
  messagingSenderId: "452334652761",
  appId: "1:452334652761:web:ebdb1906909d660ffad048",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
