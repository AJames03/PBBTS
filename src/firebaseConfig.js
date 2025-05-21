// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1pdIsYkHVFu8vLFzuOT6jhbGpiq0Z97s",
  authDomain: "pbbts-b49a4.firebaseapp.com",
  projectId: "pbbts-b49a4",
  storageBucket: "pbbts-b49a4.firebasestorage.app",
  messagingSenderId: "593502746057",
  appId: "1:593502746057:web:a124d0a451c96c87822418",
  measurementId: "G-TDHN7N4Z1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };