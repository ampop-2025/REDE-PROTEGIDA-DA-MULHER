import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyCCMRfdzXlvFLBd9PW6iGGZ6vWgfeRpRS8",

  authDomain: "rede-protegida-da-mulher.firebaseapp.com",

  projectId: "rede-protegida-da-mulher",

  storageBucket: "rede-protegida-da-mulher.firebasestorage.app",

  messagingSenderId: "828602886358",

  appId: "1:828602886358:web:a00110b42d69b0aadcc177"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
