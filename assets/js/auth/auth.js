import { signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { auth }
from "../firebase/firebase.js";

window.login = async function(){

    const email =
    document.getElementById("email").value;

    const senha =
    document.getElementById("senha").value;

    try{

        await signInWithEmailAndPassword(
            auth,
            email,
            senha
        );

        window.location.href =
        "dashboard.html";

    }
    catch(error){

        document.getElementById("msg")
        .innerHTML = error.message;

    }

}
