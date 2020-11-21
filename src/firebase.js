import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBYc1UAuNs-srnSrK60_a1UbFXXa_rcrdU",
  authDomain: "inyznieriaoprog.firebaseapp.com",
  databaseURL: "https://inyznieriaoprog.firebaseio.com",
  projectId: "inyznieriaoprog",
  storageBucket: "inyznieriaoprog.appspot.com",
  messagingSenderId: "716720660765",
  appId: "1:716720660765:web:e7405be43ea8ad01ae81f4",
  measurementId: "G-H7678M6TFM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
