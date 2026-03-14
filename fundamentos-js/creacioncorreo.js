const persona = {
    nombre: ["Lautaro","Ricardo","Martina","Javier"],
    apellido: ["Pomposiello","Insua","Cooper","Hidalgo"],
    id: [1,2,3,4],
    correo: function() {
      if (this.nombre.length === this.apellido.length && this.nombre.length === this.id.length) {
        let correos = [];
        for (let i = 0; i < this.nombre.length; i++) {
          correos.push(`${this.apellido[i][0]}${this.nombre[i]}${this.id[i]}@gmail.com`);
        }
        return correos;
      } else {
        return "Falta un dato";
      }
    }
};
console.log(persona.correo());