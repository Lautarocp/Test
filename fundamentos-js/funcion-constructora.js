function Persona (nombre,apellido,id) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.id = id;}
    
Persona.prototype.correo = function(){
        return (`${this.nombre[0]}${this.apellido}${this.id}@gmail.com`);
         };