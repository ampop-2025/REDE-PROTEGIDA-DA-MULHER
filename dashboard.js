import {

collection,
onSnapshot

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {

signOut

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {

db,
auth

}

from "./firebase.js";

const map =

L.map("map")

.setView([-30.0346,-51.2177],12);

L.tileLayer(

"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

).addTo(map);

const markers = {};

onSnapshot(

collection(db,"localizacoes"),

(snapshot)=>{

snapshot.docChanges()

.forEach(change=>{

const d = change.doc.data();

if(!markers[d.nome]){

markers[d.nome] =

L.marker([d.lat,d.lng])

.addTo(map)

.bindPopup(d.nome);

}
else{

markers[d.nome]

.setLatLng([d.lat,d.lng]);

}

});

});

document

.getElementById("logout")

.onclick = ()=>{

signOut(auth);

window.location="index.html";

};
