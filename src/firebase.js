import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0KWpm7YmobFcEpYsuFFoCjC-GrPSZ-HQ",
  authDomain: "naaz-pardha.firebaseapp.com",
  projectId: "naaz-pardha",
  storageBucket: "naaz-pardha.firebasestorage.app",
  messagingSenderId: "668944653095",
  appId: "1:668944653095:web:787c1a3ed6d81675be6702"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
