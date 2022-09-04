import Constants from 'expo-constants';
// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:  Constants.manifest?.extra?.firebaseApiKey,
  authDomain:   Constants.manifest?.extra?.firebaseAuthDomain,
  projectId:   Constants.manifest?.extra?.firebaseProjectId,
  storageBucket:  Constants.manifest?.extra?.firebaseStorageBucket ,
  messagingSenderId:  Constants.manifest?.extra?.firebaseMessagingSenderId ,
  appId:  Constants.manifest?.extra?.firebaseAppId,
};

// initialize firebase app
initializeApp(firebaseConfig);

// auth
const auth = getAuth();

// db
const db = getFirestore();

export {
  db,
  auth,
}