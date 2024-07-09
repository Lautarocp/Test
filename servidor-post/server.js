const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Middleware para analizar JSON
app.use(bodyParser.json());

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Ruta para manejar solicitudes POST
app.post('/api/enviarDatos', (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, 'public', 'usuarios.json');
  
  // Leer el contenido actual del archivo usuarios.json
  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      res.status(500).json({ error: 'Error al leer el archivo' });
      return;
    }

    let usuarios;
    try {
      usuarios = JSON.parse(fileData);
    } catch (err) {
      console.error('Error al parsear el archivo JSON:', err);
      res.status(500).json({ error: 'Error al parsear el archivo JSON' });
      return;
    }

    // Agregar el nuevo usuario al array
    usuarios.push(data);

    // Escribir el contenido actualizado en el archivo
    fs.writeFile(filePath, JSON.stringify(usuarios, null, 2), (err) => {
      if (err) {
        console.error('Error al escribir en el archivo:', err);
        res.status(500).json({ error: 'Error al escribir en el archivo' });
        return;
      }

      res.json({ message: 'Datos recibidos correctamente y archivo actualizado' });
    });
  });
});

// Ruta para manejar solicitudes GET al archivo JSON
app.get('/usuarios.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'usuarios.json'));
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
