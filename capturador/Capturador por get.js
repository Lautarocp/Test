const http = require('http');
const url = require('url');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const formData = parsedUrl.query;
  
  if (Object.keys(formData).length !== 0) {
    console.log('Datos del formulario:', formData);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<h1>Datos recibidos:</h1>`);
    res.write(`<p>Nombre: ${formData.fname}</p>`);
    res.write(`<p>Apellido: ${formData.lname}</p>`);
    res.end();
  } else {
    res.statusCode = 404;
    res.end('Página no encontrada');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
