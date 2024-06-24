import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FireBaseAPIKey,
    authDomain: "finalproject-de046.firebaseapp.com",
    projectId: "finalproject-de046",
    storageBucket: "finalproject-de046.appspot.com",
    messagingSenderId: "634114730889",
    appId: "1:634114730889:web:e4df6cc8417ce98c788f58",
    measurementId: "G-ENKNNN47QK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
// console.log(process.env.FireBaseAPIKey)
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
