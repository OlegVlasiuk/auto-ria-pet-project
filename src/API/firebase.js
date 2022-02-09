import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLdorP6LtYD0WAYk_2IqJ8mmK9MnE8df4",
  authDomain: "cars-70394.firebaseapp.com",
  projectId: "cars-70394",
  storageBucket: "cars-70394.appspot.com",
  messagingSenderId: "825980262211",
  appId: "1:825980262211:web:ad4820486eee8bb56a01f6",
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const provider = new GoogleAuthProvider();

export const addToFavorite = async (list) => {
  console.log(list);
  try {
    const docRef = await setDoc(doc(db, "favoriteCars", auth.currentUser.uid), {
      ids: list,
    });
    console.log(`Document written with ID: ${docRef}`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const removeFromFavorite = async (list) => {
  try {
    const docRef = await updateDoc(
      doc(db, "favoriteCars", auth.currentUser.uid),
      {
        ids: list,
      }
    );
    console.log(`Document remove with ID: ${docRef}`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getFavoriteList = async (userId) => {
  console.log(userId);
  if (userId) {
    const docSnap = await getDoc(doc(db, "favoriteCars", userId));
    if (docSnap) {
      const ids = docSnap?.data()?.ids;
      if (!!ids.length) {
        return ids;
      }
    }
  }
};