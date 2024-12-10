// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmekGblpoRED8Pn7URMCAf0dflY8V7LSU",
  authDomain: "shelftotales.firebaseapp.com",
  projectId: "shelftotales",
  storageBucket: "shelftotales.firebasestorage.app",
  messagingSenderId: "730474818083",
  appId: "1:730474818083:web:4038b3c45427eb83e39f96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
