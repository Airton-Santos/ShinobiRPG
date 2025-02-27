
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBfZVDQf4wTn2IezE2NnWwnH6XZUPmXR0I",
  authDomain: "narutorp-15c7c.firebaseapp.com",
  projectId: "narutorp-15c7c",
  storageBucket: "narutorp-15c7c.firebasestorage.app",
  messagingSenderId: "917019538157",
  appId: "1:917019538157:web:d0f5f3fd16b4310cdfd2e4"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };