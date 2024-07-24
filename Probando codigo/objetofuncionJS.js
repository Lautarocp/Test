const persona = {
    Nombre: "Lautaro",
    Apellido: "Pomposiello",
    id:"32",
    correo: () => {
      return `${persona.Nombre[0]}${persona.Apellido}@gmail.com`
    },
    nombreCompleto: () => {
      return `${persona.Nombre} ${persona.Apellido}`
    },
  }
  persona.correo()
  persona.nombreCompleto()