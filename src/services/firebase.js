import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBT73Y22Oal1CP9IN0rkJj_ISmluddZQoM",
  authDomain: "techaprender-42fd1.firebaseapp.com",
  projectId: "techaprender-42fd1",
  storageBucket: "techaprender-42fd1.firebasestorage.app",
  messagingSenderId: "427431782652",
  appId: "1:427431782652:web:15170488e0f1828c03cf79"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)