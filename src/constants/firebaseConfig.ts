import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFrnzjaAZH85eK8eUmqx0H-UorHHc3Y8A",
  authDomain: "compliice-test.firebaseapp.com",
  projectId: "compliice-test",
  storageBucket: "compliice-test.appspot.com",
  messagingSenderId: "383336468885",
  appId: "1:383336468885:web:3c2687b7ac5de7d706269c",
  // measurementId: "G-YKRSBWDH4M"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
