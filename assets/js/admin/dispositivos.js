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

doc,
setDoc,
collection,
onSnapshot,
serverTimestamp

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

document
.getElementById("salvar")
.addEventListener(
"click",
salvarDispositivo
);

async function salvarDispositivo(){

const serial =
document.getElementById("serial").value;

const modelo =
document.getElementById("modelo").value;

const imei =
document.getElementById("imei").value;

const chip =
document.getElementById("chip").value;

if(
!serial ||
!modelo
){

document.getElementById("msg")
.innerHTML =
"Preencha Serial e Modelo.";

return;

}

try{

await setDoc(

doc(
db,
"dispositivos",
serial
),

{

serial,

modelo,

imei,

chip,

status:"offline",

ativo:true,

bateria:100,

latitude:0,

longitude:0,

altitude:0,

usuarioId:"",

ultimaAtualizacao:
serverTimestamp()

}

);

document.getElementById("msg")
.innerHTML =
"Dispositivo salvo.";

document.getElementById("serial").value="";
document.getElementById("modelo").value="";
document.getElementById("imei").value="";
document.getElementById("chip").value="";

}
catch(error){

document.getElementById("msg")
.innerHTML =
error.message;

}

}

onSnapshot(

collection(
db,
"dispositivos"
),

(snapshot)=>{

const lista =
document.getElementById("lista");

lista.innerHTML="";

snapshot.forEach((docItem)=>{

const d =
docItem.data();

lista.innerHTML += `

<div class="dispositivo">

<h3>${d.serial}</h3>

<p>
Modelo:
${d.modelo}
</p>

<p>
IMEI:
${d.imei}
</p>

<p>
Chip:
${d.chip}
</p>

<span class="status">

${d.status}

</span>

</div>

`;

});

}

);
