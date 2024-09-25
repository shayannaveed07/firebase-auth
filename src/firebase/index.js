// import firebase from "@firebase/app"
// import "firebase/storage"
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2jWZ7FhA1sGf6jGhNLprz7G-y-nERQHY",
  authDomain: "vue-firebase-auth-3d89c.firebaseapp.com",
  projectId: "vue-firebase-auth-3d89c",
  storageBucket: "vue-firebase-auth-3d89c.appspot.com",
  messagingSenderId: "923077932900",
  appId: "1:923077932900:web:bbd0ab8d8f7e850fbb2c71",
  measurementId: "G-Y43BJM9SC0",
};
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app)
const auth = getAuth(app);
export const db = getFirestore(app);
export default auth;

const storage = getStorage(app);
export { storage };
// export {firebase}
