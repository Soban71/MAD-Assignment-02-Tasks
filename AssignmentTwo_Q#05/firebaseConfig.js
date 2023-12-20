// Import the functions you need from the SDKs you need
// Firebase version 9 and above
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEQncC_CQLpVxp3q7GXWT-3ax6SSLazXQ",
  authDomain: "shoppingapp-7a775.firebaseapp.com",
  projectId: "shoppingapp-7a775",
  storageBucket: "shoppingapp-7a775.appspot.com",
  messagingSenderId: "7196125799",
  appId: "1:7196125799:web:ec8d0da54c876173b902c2",
  measurementId: "G-VP3Y7V3M3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};