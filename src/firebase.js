// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyA827W-3NjnO77Qlj1Q_76LM6ALRpXV6vk",
  authDomain: "psychologist-service-b6761.firebaseapp.com",
  projectId: "psychologist-service-b6761",
  storageBucket: "psychologist-service-b6761.appspot.com",
  messagingSenderId: "490016406471",
  appId: "1:490016406471:web:90e64925ee1ade7740b7e2",
};

export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
