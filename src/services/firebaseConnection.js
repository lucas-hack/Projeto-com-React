import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBFnOZRQ52ipiGN3ZHJtPbpr65HwWxgwvM",
    authDomain: "projeto-compass-5d23d.firebaseapp.com",
    projectId: "projeto-compass-5d23d",
    storageBucket: "projeto-compass-5d23d.appspot.com",
    messagingSenderId: "463189098672",
    appId: "1:463189098672:web:d89bae1edff0490f927b75",
    measurementId: "G-1CR6BQ51S0"
};

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)

const db = getFirestore(firebaseApp)

const storage = getStorage(firebaseApp)

export { auth, db, storage }