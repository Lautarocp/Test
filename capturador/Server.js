const http = require('http');
const url = require('url');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
      const formData = qs.parse(body);
      console.log('Datos del formulario:', formData);
      res.setHeader('Content-Type', 'text/html');
      res.write('<h1>Datos recibidos:</h1>');
      res.write(`<p>Nombre: ${formData.fname}</p>`);
      res.write(`<p>Apellido: ${formData.lname}</p>`);
      res.end('Datos recibidos');
      
      
    });
  } else {
    res.statusCode = 404;
    res.end('Página no encontrada');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
