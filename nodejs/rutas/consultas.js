module.exports = function consultasHandler(consultas) {
    return {
      get: (data, callback) => {
        if (typeof data.indice !== "undefined") {
          console.log("handler consultas", { data });
          if (consultas[data.indice]) {
            return callback(200, consultas[data.indice]);
          }
          return callback(404, {
            mensaje: `consulta con indice ${data.indice} no encontrada`,
          });
        }
        callback(200, consultas);
      },
      post: (data, callback) => {
        consultas.push(data.payload);
        callback(201, data.payload);
      },
      put: (data, callback) => {
        if (typeof data.indice !== "undefined") {
          if (consultas[data.indice]) {
            consultas[data.indice] = data.payload;
            return callback(200, consultas[data.indice]);
          }
          return callback(404, {
            mensaje: `consulta con indice ${data.indice} no encontrada`,
          });
        }
        callback(400, { mensaje: "indice no enviado" });
      },
      delete: (data, callback) => {
        const idx = Number(data.indice);
        if (typeof data.indice !== "undefined") {
          if (consultas[idx]) {
            consultas.splice(idx, 1);
            return callback(204, {
              mensaje: `elemento con indice ${idx} eliminado`,
            });
          }
          return callback(404, {
            mensaje: `consulta con indice ${idx} no encontrada`,
          });
        }
        callback(400, { mensaje: "indice no enviado" });
      },
    };
  };