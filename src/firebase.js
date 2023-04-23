// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTsM0joz3LyiOHxm3ZWAd52IoNhqyzYvU",
  authDomain: "milestone2-248a2.firebaseapp.com",
  projectId: "milestone2-248a2",
  storageBucket: "milestone2-248a2.appspot.com",
  messagingSenderId: "190018635240",
  appId: "1:190018635240:web:68b959096291e62bef105d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
