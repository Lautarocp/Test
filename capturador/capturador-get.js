const http = require('http');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, 'http://localhost');
  const formData = Object.fromEntries(parsedUrl.searchParams);

  if (Object.keys(formData).length !== 0) {
    console.log('Datos del formulario:', formData);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<h1>Datos recibidos:</h1>`);
    res.write(`<p>Nombre: ${escapeHtml(formData.fname)}</p>`);
    res.write(`<p>Apellido: ${escapeHtml(formData.lname)}</p>`);
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
