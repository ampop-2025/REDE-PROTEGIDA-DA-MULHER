import {
auth,
db
}
from "../firebase/firebase.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
collection,
query,
where,
getDocs
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

export function protegerPagina(tipoPermitido){

    onAuthStateChanged(auth, async(user)=>{

        if(!user){

            window.location.href =
            "../../index.html";

            return;
        }

        const q = query(
            collection(db,"usuariosSistema"),
            where("email","==",user.email)
        );

        const snapshot =
        await getDocs(q);

        if(snapshot.empty){

            window.location.href =
            "../acesso-negado.html";

            return;
        }

        const dados =
        snapshot.docs[0].data();

        const tipo =
        dados.tipo;

        if(tipo === "admin"){
            return;
        }

        if(tipo !== tipoPermitido){

            window.location.href =
            "../acesso-negado.html";

        }

    });

}
