const lista = document.getElementById("lista");
const boton = document.getElementById("boton");

function reqListener() {
  const usuarios = JSON.parse(this.responseText);
  const usuarioRender = usuarios
    .map(usuario => `<li>${usuario.nombre}</li>`)
    .join("");
  lista.innerHTML = usuarioRender;
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://localhost:3000/usuarios.json");
oReq.send();

function enviarDatos() {
  var oReq = new XMLHttpRequest();
  oReq.open("POST", "http://localhost:3000/api/enviarDatos", true);
  oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  oReq.send(JSON.stringify({ nombre: "sabado22" }));

  oReq.onreadystatechange = function () {
    if (oReq.readyState === XMLHttpRequest.DONE) {
      if (oReq.status === 200) {
        console.log('Datos enviados:', oReq.responseText);
      } else {
        console.error('Error en la solicitud:', oReq.status, oReq.statusText);
      }
    }
  };
refrescar();}

function refrescar(){
    oReq.open("GET", "http://localhost:3000/usuarios.json");
oReq.send();
};
boton.onclick = enviarDatos;
