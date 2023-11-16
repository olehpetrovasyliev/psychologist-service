// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA827W-3NjnO77Qlj1Q_76LM6ALRpXV6vk",
  authDomain: "psychologist-service-b6761.firebaseapp.com",
  projectId: "psychologist-service-b6761",
  storageBucket: "psychologist-service-b6761.appspot.com",
  messagingSenderId: "490016406471",
  appId: "1:490016406471:web:90e64925ee1ade7740b7e2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
