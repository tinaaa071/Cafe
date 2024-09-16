// src/firebase.js

// Import the Firebase modules that you need in your app
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCphHtgq4FQ0P4xfMcyaOHAtwKFkF8Up3k",
    authDomain: "cafe-ab6eb.firebaseapp.com",
    databaseURL: "https://cafe-ab6eb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cafe-ab6eb",
    storageBucket: "cafe-ab6eb.appspot.com",
    messagingSenderId: "1005521758558",
    appId: "1:1005521758558:web:80dd853c78a080845ec7cf",
    measurementId: "G-SJ13W9PZ0E"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth (if needed)
const auth = getAuth(app);

export { db, auth };
