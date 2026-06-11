import {
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
collection,
query,
where,
getDocs
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
auth,
db
}
from "../firebase/firebase.js";

window.login = async function(){

    const email =
    document.getElementById("email").value;

    const senha =
    document.getElementById("senha").value;

    const msg =
    document.getElementById("msg");

    msg.innerHTML = "";

    try{

        await signInWithEmailAndPassword(
            auth,
            email,
            senha
        );

        const q = query(
            collection(db,"usuariosSistema"),
            where("email","==",email)
        );

        const snapshot =
        await getDocs(q);

        if(snapshot.empty){

            msg.innerHTML =
            "Usuário não cadastrado no sistema.";

            return;
        }

        const usuario =
        snapshot.docs[0].data();

        if(usuario.ativo !== true){

            msg.innerHTML =
            "Usuário inativo.";

            return;
        }

        switch(usuario.tipo){

            case "admin":

                window.location.href =
                "pages/admin/dashboard.html";

                break;

            case "operador":

                window.location.href =
                "pages/operador/dashboard.html";

                break;

            case "contato":

                window.location.href =
                "pages/contato/dashboard.html";

                break;

            case "usuario":

                window.location.href =
                "pages/usuario/dashboard.html";

                break;

            default:

                msg.innerHTML =
                "Perfil inválido.";

        }

    }
    catch(error){

        msg.innerHTML =
        error.message;

    }

}
