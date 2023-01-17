// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf_E5Ze8xzAslkFODuvDHfLcQHOshUK4c",
  authDomain: "chatsapp1-a0887.firebaseapp.com",
  projectId: "chatsapp1-a0887",
  storageBucket: "chatsapp1-a0887.appspot.com",
  messagingSenderId: "724383375139",
  appId: "1:724383375139:web:face7ad07c891f15997696"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);