function Persona(nombre, apellido, id) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.id = id;
    this.correo = () => {
      return `${this.nombre[0]}${this.apellido}@gmail.com`;
    };
    this.nombreCompleto = function () {
      return `${this.nombre} ${this.apellido}`;
    };
  }
let lautaro = new Persona("lautaro", "Pomposiello", 20);
lautaro.correo();
lautaro.nombreCompleto();
const martu = {
  nombre: "Martina",
  apellido: "Cooper",
  id: 21
};
lautaro.nombreCompleto.call(martu);
lautaro.correo.call(martu);
/*
No devuelve el correo con Martina porque es una arrow function y su "this" es el valor en que fue llamado,
 no se puede usar para delegación de funciones con call, apply, o bind
*/
 