const lista =document.getElementById("lista");
const boton =document.getElementById("boton");
function reqListener() { 
    const usuarios = JSON.parse(this.responseText)
    const usuarioRender = usuarios
        .map(usuario=>`<li>${usuario.nombre}</li>`)
        .join("");
        lista.innerHTML= usuarioRender;
};


var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET","https://raw.githubusercontent.com/Lautarocp/Testing/main/Ejemplos%20con%20ajax/usuarios.json");
oReq.send();

function enviarDatos()
{     oReq.open("POST", "https://raw.githubusercontent.com/Lautarocp/Testing/main/Ejemplos%20con%20ajax/usuarios.json",true);
    oReq.setRequestHeader("Content-Type",         "aplication/x-www-form-urlencoded"
    );
     oReq.send("nombre=sabado22")
}
 boton.onclick = enviarDatos