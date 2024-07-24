const persona = {
    Nombre: ["Lautaro","Ricardo","Martina","Javier",],
    Apellido: ["Pomposiello","Insua","Cooper","Hidalgo"],
    Id: [1,2,3,4],
      correo: function() {
          if(this.Nombre.length==this.Apellido.length && this.Nombre.length==this.Id.length){
        let correos = [];
      for (let i = 0; i < this.Nombre.length; i++) 
            {
        correos.push(`${this.Apellido[i][0]}${this.Nombre[i]}${this.Id[i]}@gmail.com`);
            }
       return correos;
         } else{
  return "Falta un dato";
       }
}
};
console.log(persona.correo())