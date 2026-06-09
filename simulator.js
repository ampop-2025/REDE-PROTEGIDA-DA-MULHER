import {

doc,
setDoc

}

from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {

db

}

from "./firebase.js";

setInterval(async()=>{

const lat =
-30.0346 +
(Math.random()*0.01);

const lng =
-51.2177 +
(Math.random()*0.01);

await setDoc(

doc(
db,
"localizacoes",
"maria"
),

{

nome:"Maria",

lat,

lng,

status:"PANICO",

timestamp:Date.now()

}

);

},5000);
