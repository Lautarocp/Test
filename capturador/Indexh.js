const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

app.all("/", (req, res) => {
  let respuesta = {};

  respuesta.body = req.body;
  respuesta.params = req.params;
  respuesta.query = req.query;
  respuesta.headers = req.headers;
  respuesta.files = req.files;
  respuesta.file = req.file;
  respuesta.ip = req.ip || req.ips;

  console.log({ respuesta });

  const archivo = req?.files?.archivo ?? null;

  if (archivo) {
    const safeName = path.basename(archivo.name);
    const destino = path.join(__dirname, 'files', safeName);
    archivo.mv(destino, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json(respuesta);
    });
  } else {
    res.status(200).json(respuesta);
  }
});

app.listen(3000, () => {
  console.log("app corriendo en el puerto 3000");
});