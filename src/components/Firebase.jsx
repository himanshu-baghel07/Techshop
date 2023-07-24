// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_Vj-3IW2YMXbX-ze5EEZ8RSa_HxQvLpQ",

  authDomain: "techshop-61e42.firebaseapp.com",

  projectId: "techshop-61e42",

  storageBucket: "techshop-61e42.appspot.com",

  messagingSenderId: "817943412828",

  appId: "1:817943412828:web:ce3649f830e88a4b0d6699",

  measurementId: "G-6Q633973H1",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
