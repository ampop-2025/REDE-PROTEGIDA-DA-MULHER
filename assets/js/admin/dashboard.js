import {
auth,
db
}
from "../firebase/firebase.js";

import {
signOut
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
collection,
onSnapshot
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

document
.getElementById("logout")
.addEventListener(
"click",
async()=>{

await signOut(auth);

window.location.href =
"../../index.html";

}
);

onSnapshot(
collection(db,"usuarios"),
(snapshot)=>{

document.getElementById(
"totalUsuarios"
).innerHTML =
snapshot.size;

}
);

onSnapshot(
collection(db,"usuariosSistema"),
(snapshot)=>{

let operadores = 0;
let contatos = 0;

snapshot.forEach(doc=>{

const d = doc.data();

if(d.tipo==="operador")
operadores++;

if(d.tipo==="contato")
contatos++;

});

document.getElementById(
"totalOperadores"
).innerHTML =
operadores;

document.getElementById(
"totalContatos"
).innerHTML =
contatos;

}
);
