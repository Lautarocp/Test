const lista =document.getElementById("lista");
const boton =document.getElementById("boton");
function reqListener() { 
    const usuarios = JSON.parse(this.responseText)
    const usuarioRender = usuarios
        .map(usuario=>`<li>${usuario.nombre}</li>`)
        .join("");
        console.log(usuarioRender);
        lista.innerHTML= usuarioRender;
};


var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET","http://127.0.0.1:5500/Ejemplos%20con%20ajax/usuarios.json");
oReq.send();

function enviarDatos(){
    oReq.open("POST", "http://127.0.0.1:5500/Ejemplos%20con%20ajax/usuarios.json",true);
    oReq.setRequestHeader("Content-Type",
        "aplication/x-www-form-urlencoded"
    );
    oReq.send("nombre=sabado22")
}
boton.onclick = enviarDatos;