import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX-Vfvg73b6BnpM4ZAAG59DBrLAaZXyRc",
  authDomain: "fit5032-3f2b1.firebaseapp.com",
  projectId: "fit5032-3f2b1",
  storageBucket: "fit5032-3f2b1.firebasestorage.app",
  messagingSenderId: "986293386407",
  appId: "1:986293386407:web:450ec1084d2bec7c3a2f82"
};

initializeApp(firebaseConfig);
const db = getFirestore();
export default db