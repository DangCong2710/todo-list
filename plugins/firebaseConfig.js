import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWK7TAT1h2dgrvQxkStMUygpUoJo9Bhv8",
  authDomain: "to-do-list-4f073.firebaseapp.com",
  projectId: "to-do-list-4f073",
  storageBucket: "to-do-list-4f073.appspot.com",
  messagingSenderId: "244613082180",
  appId: "1:244613082180:web:7ec9cfbc7a85656ec02011"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore()


export {
  firebaseApp,
  db,
}
