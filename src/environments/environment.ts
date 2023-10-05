import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';    


export const firebaseConfig = {
    apiKey: "AIzaSyDvp9v4aFoT1BAPPOtYdBZIUPIZIvBxjZI",
    authDomain: "fntssecurityapp.firebaseapp.com",
    projectId: "fntssecurityapp",
    storageBucket: "fntssecurityapp.appspot.com",
    messagingSenderId: "792339987995",
    appId: "1:792339987995:web:e5c7a61c50a7f8bb3b02be"
  };

  let baseUrl = 'https://fnts-backend.fly.dev'
  export default baseUrl;


// const app = initializeApp(firebaseConfig)

// const db = getFirestore(app)