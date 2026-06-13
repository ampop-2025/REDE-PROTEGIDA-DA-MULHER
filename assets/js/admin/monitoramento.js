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

collection(
db,
"dispositivos"
),

(snapshot)=>{

const cards =
document.getElementById("cards");

cards.innerHTML="";

snapshot.forEach((docItem)=>{

const d =
docItem.data();

cards.innerHTML += `

<div class="card-monitoramento">

<h3>

${d.usuarioNome || "Sem Usuária"}

</h3>

<p>

Dispositivo:
${d.serial}

</p>

<p>

Modelo:
${d.modelo}

</p>

<p>

Bateria:
${d.bateria || 0}%

</p>

<p>

Latitude:
${d.latitude || 0}

</p>

<p>

Longitude:
${d.longitude || 0}

</p>

<p>

Status:
${d.status || "offline"}

</p>

<span class="status">

${d.status || "offline"}

</span>

</div>

`;

});

}

);
