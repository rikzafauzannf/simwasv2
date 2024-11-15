// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDqZ4Ec9UxT19VwkimUfntAG2BGXpB_NgY',
  authDomain: 'simwas-43d36.firebaseapp.com', 
  projectId: 'simwas-43d36',
  storageBucket: 'simwas-43d36.firebasestorage.app',
  messagingSenderId: '347853228552',
  appId: '1:347853228552:web:85ba82ba8b9cbcf6989fbd',
  measurementId: 'G-S4YKFSE74R'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
