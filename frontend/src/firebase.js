import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChTNx7XsCFmhlDk4ZZjTeySwUtkpmxNx0",
  authDomain: "liferoute-29825.firebaseapp.com",
  projectId: "liferoute-29825",
  storageBucket: "liferoute-29825.firebasestorage.app",
  messagingSenderId: "197259865839",
  appId: "1:197259865839:web:1a06d2f79e5f5c5775b51a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;



