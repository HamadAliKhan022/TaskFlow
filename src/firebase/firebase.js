import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWmjrHaURbJcHl8k-ib3ECz2e_dbKHJZs",
  authDomain: "taskflow-hamad-2026.firebaseapp.com",
  projectId: "taskflow-hamad-2026",
  storageBucket: "taskflow-hamad-2026.firebasestorage.app",
  messagingSenderId: "850037162468",
  appId: "1:850037162468:web:fc47a9250280f6557687f1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
