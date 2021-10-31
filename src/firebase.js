import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {

  apiKey: "AIzaSyCE0QCJbpyMg8U-yDm5V0lxtWyxvIqeLks",

  authDomain: "event-app-fb8ab.firebaseapp.com",

  projectId: "event-app-fb8ab",

  storageBucket: "event-app-fb8ab.appspot.com",

  messagingSenderId: "152331639497",

  appId: "1:152331639497:web:efd555086b523fe5c60b18"

};


// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();

