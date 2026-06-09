import {

signInWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { auth }

from "./firebase.js";

window.login = async ()=>{

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

window.location =
"dashboard.html";

}
catch(e){

document.getElementById("msg")
.innerText = e.message;

}

}
