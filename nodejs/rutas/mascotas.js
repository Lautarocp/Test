module.exports = function mascotasHandler(mascotas) {
    return {
      get: (data, callback) => {
        if (typeof data.indice !== "undefined") {
          console.log("handler mascotas", { data });
          if (mascotas[data.indice]) {
            return callback(200, mascotas[data.indice]);
          }
          return callback(404, {
            mensaje: `mascota con indice ${data.indice} no encontrada`,
          });
        }
        callback(200, mascotas);
      },
      post: (data, callback) => {
        mascotas.push(data.payload);
        callback(201, data.payload);
      },
      put: (data, callback) => {
        if (typeof data.indice !== "undefined") {
          if (mascotas[data.indice]) {
            mascotas[data.indice] = data.payload;
            return callback(200, mascotas[data.indice]);
          }
          return callback(404, {
            mensaje: `mascota con indice ${data.indice} no encontrada`,
          });
        }
        callback(400, { mensaje: "indice no enviado" });
      },
      delete: (data, callback) => {
        const idx = Number(data.indice);
        if (typeof data.indice !== "undefined") {
          if (mascotas[idx]) {
            mascotas.splice(idx, 1);
            return callback(204, {
              mensaje: `elemento con indice ${idx} eliminado`,
            });
          }
          return callback(404, {
            mensaje: `mascota con indice ${idx} no encontrada`,
          });
        }
        callback(400, { mensaje: "indice no enviado" });
      },
    };
  };