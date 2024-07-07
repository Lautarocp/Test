function obtenerNombre() {
    return "Lautaro";
}
function obtenerApellido() {
    return "Pomposiello";
}
function obtenerNombreCompleto() {
    const nombre = obtenerNombre();
    const apellido = obtenerApellido();
    return `${nombre} ${apellido}`;
}
const nombreCompleto = obtenerNombreCompleto();

console.log("Nombre completo ", nombreCompleto);