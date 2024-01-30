// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG8EQdy5DcUgtjN4BiwVeol7FD5_Mcm8o",
  authDomain: "fastcampus-twitter-65271.firebaseapp.com",
  projectId: "fastcampus-twitter-65271",
  storageBucket: "fastcampus-twitter-65271.appspot.com",
  messagingSenderId: "361543525160",
  appId: "1:361543525160:web:125268ef1c8b2a6a60e61d",
  measurementId: "G-DL3BGCSSQ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
