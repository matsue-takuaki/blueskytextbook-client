// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiFMDyAOxrUzw4tTwJH8rue9UGl842sjQ",
  authDomain: "bluesky-textbook.firebaseapp.com",
  projectId: "bluesky-textbook",
  storageBucket: "bluesky-textbook.appspot.com",
  messagingSenderId: "515223980060",
  appId: "1:515223980060:web:a57dd6e840461c5e8877d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth,provider};