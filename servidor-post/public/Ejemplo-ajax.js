const lista = document.getElementById("lista");
const boton = document.getElementById("boton");

async function cargarUsuarios() {
  try {
    const respuesta = await fetch("http://localhost:3000/usuarios.json");
    if (!respuesta.ok) {
      throw new Error(`Error al cargar usuarios: ${respuesta.status}`);
    }
    const usuarios = await respuesta.json();
    const usuarioRender = usuarios
      .map(usuario => `<li>${usuario.nombre}</li>`)
      .join("");
    lista.innerHTML = usuarioRender;
  } catch (error) {
    console.error("Error:", error);
    lista.innerHTML = "<li>Error al cargar usuarios</li>";
  }
}

async function enviarDatos() {
  try {
    const respuesta = await fetch("http://localhost:3000/api/enviarDatos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre: "sabado22" }),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al enviar datos: ${respuesta.status}`);
    }
    const resultado = await respuesta.json();
    console.log("Datos enviados:", resultado);
    await cargarUsuarios();
  } catch (error) {
    console.error("Error:", error);
  }
}

cargarUsuarios();
boton.onclick = enviarDatos;
