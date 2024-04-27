import { getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA-8wq7oaAsAw-7Pj0V-9UN9Fr-M7JuZ_M",
  authDomain: "admin-dashboard-b4b09.firebaseapp.com",
  projectId: "admin-dashboard-b4b09",
  storageBucket: "admin-dashboard-b4b09.appspot.com",
  messagingSenderId: "276341586909",
  appId: "1:276341586909:web:4fe4f4728120612fe61434"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
