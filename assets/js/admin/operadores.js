import { db }
from "../firebase/firebase.js";

import {

collection,
addDoc,
onSnapshot,
serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const lista =
document.getElementById("lista");

const btnSalvar =
document.getElementById("btnSalvar");

const msg =
document.getElementById("msg");

btnSalvar.addEventListener(
"click",
salvar
);

async function salvar(){

const nome =
document.getElementById("nome").value;

const email =
document.getElementById("email").value;

const tipo =
document.getElementById("tipo").value;

if(!nome || !email){

msg.innerHTML =
"Preencha todos os campos.";

return;

}

try{

await addDoc(

collection(
db,
"usuariosSistema"
),

{

nome,

email,

tipo,

ativo:true,

criadoEm:
serverTimestamp()

}

);

msg.innerHTML =
"Usuário criado com sucesso.";

document.getElementById("nome").value="";
document.getElementById("email").value="";

}
catch(error){

msg.innerHTML =
error.message;

}

}

onSnapshot(

collection(
db,
"usuariosSistema"
),

(snapshot)=>{

lista.innerHTML="";

snapshot.forEach((doc)=>{

const dados =
doc.data();

lista.innerHTML += `

<div class="usuario">

<strong>
${dados.nome}
</strong>

${dados.email}<br>

<span class="badge">
${dados.tipo}
</span>

</div>

`;

});

}

);
