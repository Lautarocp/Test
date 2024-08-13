const crearPersona = function(nombre, ape, id) {
    // Variables privadas
    let Nombre = nombre;
    let Apellido = ape;
    let identificacion = id;

    // Métodos públicos
    return {
        correo: function() {
            return `${Nombre[0]}${Apellido}@gmail.com`;
        },
        nombreCompleto: function() {
            return `${Nombre} ${Apellido}`;
        },
        obtenerId: function() {
            return identificacion;  
        }
    };
};

// Crear una nueva persona usando el closure
const persona1 = crearPersona('Lautaro', 'Pompo', '23');

// Usar los métodos públicos
console.log(persona1.correo()); // "LPompo@gmail.com"
console.log(persona1.nombreCompleto()); // "Lautaro Pompo"
console.log(persona1.obtenerId()); // "23"asd