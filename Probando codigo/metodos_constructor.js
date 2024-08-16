function persona (nome,ape,id) {
    this.Nombre = nome,
    this.Apellido = ape,
    this.id =id,
    this.correo = () => {
      return `${this.Nombre[0]}${this.Apellido}@gmail.com`
    },
    this.nombreCompleto = function () {
      return `${this.Nombre} ${this.Apellido}`
    }
  }
let lautaro = new persona("lautaro","Pomposiello",20)
lautaro.correo()
lautaro.nombreCompleto()
const Martu ={
  Nombre:"Martina",
  Apellido:"Cooper",
  id:21
}
lautaro.nombreCompleto.call(Martu)
lautaro.correo.call(Martu)/*
no devuelve el correo con Martina porque es una arrow function y su "this" es el valor en que fue llamado,
 no se puede usar para delegacion de funciones con call, apply, o bind*/
 