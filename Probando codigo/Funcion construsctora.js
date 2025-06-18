function Persona (nombre,apellido,id) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.id = id;}
    
Persona.prototype.correo = function(){
        return (`${this.nombre[0]}${this.apellido}${this.id}@gmail.com`);
         };


class Persona1{
constructor(nombre,apellido,id){
       this.nombre = nombre;
       this.apellido = apellido;
       this.id = id;
       this.email = []
   };
   correo(){
     this.email.push(`${this.nombre[0]}${this.apellido}${this.id}@gmail.com`);
        };
        }
let lautaro = new Persona1 ("Alberto","rodigrez",23)
lautaro.correo() //debo ejecutar la funcion, si no, email esta vacio
lautaro.email