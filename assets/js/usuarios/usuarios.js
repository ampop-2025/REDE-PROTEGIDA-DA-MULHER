import {
db
}
from "../firebase/firebase.js";

import {

collection,
addDoc,
serverTimestamp,
onSnapshot

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const btnSalvar =
document.getElementById("btnSalvar");

const listaUsuarios =
document.getElementById("listaUsuarios");

const mensagem =
document.getElementById("mensagem");

btnSalvar.addEventListener(
"click",
salvarUsuario
);

async function salvarUsuario(){

const nome =
document.getElementById("nome").value;

const telefone =
document.getElementById("telefone").value;

const email =
document.getElementById("email").value;

const contatoEmergencia =
document.getElementById("contatoEmergencia").value;

const dataNascimento =
document.getElementById("dataNascimento").value;

if(!nome){

mensagem.innerHTML =
"Informe o nome.";

return;

}

try{

await addDoc(

collection(db,"usuarios"),

{

nome,

telefone,

email,

contatoEmergencia,

dataNascimento,

ativo:true,

tipo:"usuario",

status:"NORMAL",

criadoEm:serverTimestamp()

}

);

mensagem.innerHTML =
"Usuária cadastrada com sucesso.";

document.getElementById("nome").value="";
document.getElementById("telefone").value="";
document.getElementById("email").value="";
document.getElementById("contatoEmergencia").value="";
document.getElementById("dataNascimento").value="";

}
catch(error){

mensagem.innerHTML =
error.message;

}

}

onSnapshot(

collection(db,"usuarios"),

(snapshot)=>{

listaUsuarios.innerHTML="";

snapshot.forEach((doc)=>{

const u = doc.data();

listaUsuarios.innerHTML += `

<div class="usuario">

<strong>${u.nome}</strong>

📞 ${u.telefone || ""}<br>

📧 ${u.email || ""}

</div>

`;

});

}

);
