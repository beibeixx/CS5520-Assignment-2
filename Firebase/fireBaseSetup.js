// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_apiKey,
  authDomain: process.env.EXPO_PUBLIC_API_authDomain,
  projectId: process.env.EXPO_PUBLIC_API_projectId,
  storageBucket: process.env.EXPO_PUBLIC_API_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_API_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_API_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
// const analytics = getAnalytics(app);