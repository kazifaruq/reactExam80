// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe7BJt9hgDBAoYc4Qgpld7xJIvpCK0fm4",
  authDomain: "ecom-firebase-4d851.firebaseapp.com",
  projectId: "ecom-firebase-4d851",
  storageBucket: "ecom-firebase-4d851.appspot.com",
  messagingSenderId: "948355628",
  appId: "1:948355628:web:4dc113f0b0e935aed48789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);