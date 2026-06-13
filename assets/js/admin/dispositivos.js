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
updateDoc,
collection,
getDocs,
onSnapshot,
serverTimestamp

}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



let usuarios = [];



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

        document
        .getElementById("msg")
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

                usuarioNome:"",

                ultimaAtualizacao:
                serverTimestamp()

            }

        );

        document
        .getElementById("msg")
        .innerHTML =
        "Dispositivo salvo.";

        document
        .getElementById("serial")
        .value="";

        document
        .getElementById("modelo")
        .value="";

        document
        .getElementById("imei")
        .value="";

        document
        .getElementById("chip")
        .value="";

    }
    catch(error){

        document
        .getElementById("msg")
        .innerHTML =
        error.message;

    }

}



async function carregarUsuarios(){

    const snapshot =
    await getDocs(

        collection(
            db,
            "usuarios"
        )

    );

    usuarios = [];

    snapshot.forEach((docItem)=>{

        usuarios.push({

            id: docItem.id,

            ...docItem.data()

        });

    });

}



function preencherCombos(){

    document
    .querySelectorAll(
        "select[id^='usuario_']"
    )
    .forEach(select=>{

        const valorAtual =
        select.dataset.usuarioAtual || "";

        select.innerHTML =
        "<option value=''>Selecione</option>";

        usuarios.forEach(usuario=>{

            select.innerHTML += `

            <option
            value="${usuario.id}"
            ${usuario.id===valorAtual?"selected":""}>

            ${usuario.nome}

            </option>

            `;

        });

    });

}



window.vincularUsuario =
async function(dispositivoId){

    const select =
    document.getElementById(
        `usuario_${dispositivoId}`
    );

    const usuarioId =
    select.value;

    if(!usuarioId){

        alert(
            "Selecione uma usuária."
        );

        return;

    }

    const usuario =
    usuarios.find(
        u => u.id === usuarioId
    );

    try{

        await updateDoc(

            doc(
                db,
                "dispositivos",
                dispositivoId
            ),

            {

                usuarioId:
                usuario.id,

                usuarioNome:
                usuario.nome

            }

        );

        alert(
            "Dispositivo vinculado."
        );

    }
    catch(error){

        alert(
            error.message
        );

    }

};



await carregarUsuarios();



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

                <h3>

                ${d.serial}

                </h3>

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

                <p>

                Usuária:

                <b>

                ${d.usuarioNome || "Não vinculada"}

                </b>

                </p>

                <select
                id="usuario_${docItem.id}"
                data-usuario-atual="${d.usuarioId || ""}">

                </select>

                <button
                onclick="vincularUsuario('${docItem.id}')">

                Vincular

                </button>

                <br><br>

                <span class="status">

                ${d.status}

                </span>

            </div>

            `;

        });

        preencherCombos();

    }

);
