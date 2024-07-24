  const url = require("url");
  const StringDecoder = require("string_decoder").StringDecoder;
  const enrutador = require("./enrutador");

  module.exports = (req, res) => {
    // Obtener la URL desde el objeto request
    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);

    // Obtener la ruta
    const ruta = urlParseada.pathname;

    // Quitar las barras diagonales adicionales de la ruta
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, "");

    // Obtener el método HTTP
    const metodo = req.method.toLowerCase();

    // Obtener variables del query URL
    const { query = {} } = urlParseada;

    // Obtener los headers de la solicitud
    const { headers = {} } = req;

    // Obtener el payload, si existe
    const decoder = new StringDecoder("utf-8");
    let buffer = "";

    // Acumular la data cuando la solicitud reciba un payload
    req.on("data", (data) => {
      buffer += decoder.write(data);
    });

    // Terminar de acumular datos y finalizar el decoder
    req.on("end", () => {
      buffer += decoder.end();

      if (headers["content-type"] === "file") {
        buffer = JSON.parse(buffer);
      }

      // Revisar si tiene subrutas
      let rutaPrincipal, indice;
      if (rutaLimpia.indexOf("/") > -1) {
        [rutaPrincipal, indice] = rutaLimpia.split("/");
      }

      // Ordenar la data del request
      const data = {
        indice,
        ruta: rutaPrincipal || rutaLimpia,
        query,
        metodo,
        headers,
        payload: buffer,
      };

      console.log({ data });

      // Elegir el manejador dependiendo de la ruta
      let handler;
      if (enrutador[data.ruta] && enrutador[data.ruta][metodo]) {
        handler = enrutador[data.ruta][metodo];
      } else {
        handler = enrutador.noEncontrado;
      }
       
      // Ejecutar el manejador para enviar la respuesta
      if (typeof handler === "function") {
        handler(data, (statusCode = 200, mensaje) => {
          // Construir la respuesta HTML
          
          
          const respuestaHTML = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Respuesta</title>
            </head>
            <body>
              <h1>Respuesta del servidor</h1>
              <p>"query"${JSON.stringify(data.query)}</p><br>
              <p>"Indice"${JSON.stringify(data.indice)}</p><br>
              <p>"Ruta"${JSON.stringify(data.ruta)}</p><br>
              <p>"Metodo" ${JSON.stringify(data.metodo)}</p><br>
              <p>"HEADER"${JSON.stringify(data.headers)}</p><br>
              <p>"PAYLOAD"${JSON.stringify(data.payload)}</p><br>
              <p>"BUFFER"${JSON.stringify(data.buffer)}</p><br>
            </body>
            </html>
          `;
          
          // Establecer los encabezados de la respuesta
          res.setHeader("Content-Type", "text/html");
          res.writeHead(statusCode);
          
          // Enviar la respuesta HTML al cliente
          res.end(respuestaHTML);
        });
      } else {
        // Si no se encuentra un manejador válido, responder con un estado 404
        res.writeHead(404);
        res.end("Ruta no encontrada");
      }
      
    });
    };
