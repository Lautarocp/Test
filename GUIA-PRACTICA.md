# Guía Práctica — JavaScript Avanzado

Bienvenido a la guía práctica del repositorio. Este documento explica los conceptos clave de JavaScript y Node.js que encontrarás en el código, mostrando ejemplos **antes y después** de la refactorización.

---

## 1. Closures — Encapsulación de Datos Privados

Un **closure** es una función que tiene acceso a variables de su ámbito externo, incluso después de que esa función externa haya terminado.

### Problema: Acceso Directo sin Encapsulación

**Archivo:** `fundamentos-js/objetofuncionJS.js`

```javascript
// ❌ ANTES: El objeto accede directamente a sus propias propiedades
const persona = {
  Nombre: "Lautaro",
  Apellido: "Pompo",
  correo: () => `${persona.Nombre[0]}${persona.Apellido}@gmail.com`
};

// Problema: accede a "persona" por su nombre, no usa this
// Si renombramos "persona" a otra cosa, el código se rompe
// Los datos no son privados — cualquiera puede hacer persona.Nombre = "otro"
```

### Solución: Closure con Datos Privados

**Archivo:** `fundamentos-js/Clousure.js`

```javascript
// ✅ DESPUÉS: Closure que encapsula datos privados
const crearPersona = function(nombre, apellido, id) {
  // Nombre, Apellido, identificacion son PRIVADOS
  // Solo existen dentro de esta función y sus métodos
  let Nombre = nombre;
  let Apellido = apellido;
  let identificacion = id;

  // Retornamos un objeto con métodos públicos que acceden a los datos privados
  return {
    correo: function() {
      return `${Nombre[0]}${Apellido}@gmail.com`;
    },
    nombreCompleto: function() {
      return `${Nombre} ${Apellido}`;
    },
    obtenerId: function() {
      return identificacion;
    }
  };
};

const persona1 = crearPersona('Lautaro', 'Pompo', '23');
console.log(persona1.correo()); // "LPompo@gmail.com"
console.log(persona1.nombreCompleto()); // "Lautaro Pompo"

// Los datos privados NO son accesibles desde afuera:
console.log(persona1.Nombre); // undefined ✓
persona1.Nombre = "otro"; // No afecta el dato privado
console.log(persona1.nombreCompleto()); // Sigue siendo "Lautaro Pompo" ✓
```

### ¿Por Qué Funciona?

- `crearPersona` es una **factory function** (función que crea objetos)
- Las variables `Nombre`, `Apellido`, `identificacion` quedan "atrapadas" en el closure
- Solo los métodos retornados (`correo`, `nombreCompleto`, `obtenerId`) pueden acceder a ellas
- Es imposible modificar estos datos desde afuera

---

## 2. Funciones Constructoras vs Clases ES6

Las funciones constructoras son la forma antigua de crear clases en JavaScript. Las clases ES6 son azúcar sintáctico más legible.

### Etapa 1: Función Constructora ES5 ✓

**Archivo:** `fundamentos-js/funcion-constructora.js`

```javascript
// ✓ Correcto: Función constructora ES5 con métodos en prototype
function Persona(nombre, apellido, id) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.id = id;
}

// Los métodos se definen en prototype, no en el constructor
// Esto ahorra memoria: todos los Persona comparten el mismo método
Persona.prototype.correo = function() {
  return `${this.nombre[0]}${this.apellido}${this.id}@gmail.com`;
};

Persona.prototype.nombreCompleto = function() {
  return `${this.nombre} ${this.apellido}`;
};

const p = new Persona("Lautaro", "Pompo", 23);
console.log(p.nombreCompleto()); // "Lautaro Pompo"
console.log(p.correo()); // "LPompo23@gmail.com"
```

### Etapa 2: Problema — Arrow Functions en Constructor

**Archivo:** `fundamentos-js/metodos_constructor.js`

```javascript
// ❌ PROBLEMA: Arrow function dentro del constructor
function Persona(nombre, apellido, id) {
  this.nombre = nombre;
  this.apellido = apellido;

  // Arrow functions NO tienen su propio "this"
  // Usan el "this" del contexto donde fueron definidas
  this.correo = () => {
    return `${this.nombre[0]}${this.apellido}@gmail.com`;
  };
}

const lautaro = new Persona("Lautaro", "Pompo", 20);
const martu = { nombre: "Martina", apellido: "Cooper" };

// Esto NO funciona como esperarías
lautaro.correo.call(martu);
// Aún usa "this" de lautaro, no de martu
// ¿Por qué? Porque las arrow functions NO se pueden rebindar con .call(), .apply(), .bind()

// ✓ Pero esto sí funciona con métodos regulares:
// (ver Etapa 3)
```

### Etapa 3: Solución — Clases ES6 ✓

```javascript
// ✅ MODERNO: Clases ES6 (sintaxis más clara)
class Persona {
  constructor(nombre, apellido, id) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.id = id;
  }

  // Los métodos se definen como si estuvieran en prototype
  correo() {
    return `${this.nombre[0]}${this.apellido}${this.id}@gmail.com`;
  }

  nombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }

  // Los getters permiten acceder como propiedad, no método
  get nombreYApellido() {
    return `${this.nombre} ${this.apellido}`;
  }
}

const p = new Persona("Lautaro", "Pompo", 23);
console.log(p.nombreCompleto()); // "Lautaro Pompo"
console.log(p.nombreYApellido); // "Lautaro Pompo" (sin paréntesis)
```

### Comparación

| Aspecto | Constructor ES5 | Clase ES6 |
|---|---|---|
| Sintaxis | Function keyword | Class keyword |
| Métodos | En `.prototype` | En la clase (se ponen en prototype automáticamente) |
| Legibilidad | Requiere conocer prototypes | Más clara y directa |
| Ventaja | Compatible con navegadores antiguos | Estándar moderno |

---

## 3. Callbacks → Promises → async/await

Este es el viaje más importante en JavaScript asincrónico. Verás cómo evolucionó el manejo de operaciones que toman tiempo.

### Etapa 1: Callbacks

**Archivo:** `Callstack/ejemplo-callback-orden.js`

```javascript
// ❌ Callback simple: funciona pero no escala
function primero(callback) {
  setTimeout(() => {
    console.log("Primero");
    callback();
  }, 1000);
}

function segundo() {
  console.log("Segundo");
}

primero(segundo);
// Output:
// Primero (después de 1 segundo)
// Segundo
```

**El problema:** Si necesitas hacer 5 cosas secuencialmente, terminas con "callback hell":

```javascript
// ❌ Callback hell (pyramid of doom)
primero(() => {
  segundo(() => {
    tercero(() => {
      cuarto(() => {
        quinto(() => {
          console.log("¡Finalmente!");
        });
      });
    });
  });
});
```

### Etapa 2: Promises

**Archivo:** `Callstack/ejemplo-promesa.js`

```javascript
// ✓ Promise: resolve o reject
function fabricaDePromesas(indice) {
  return new Promise((resolve, reject) => {
    const tiempoRejected = Math.floor(Math.random() * 10000) + 1000;
    const tiempoResolved = Math.floor(Math.random() * 10000) + 1000;

    setTimeout(() => {
      reject(`promesa ${indice} rechazada`);
    }, tiempoRejected);

    setTimeout(() => {
      resolve(`promesa ${indice} resuelta`);
    }, tiempoResolved);
  });
}

// ✓ Mucho más legible que callbacks anidados
fabricaDePromesas(1)
  .then(resultado => console.log(resultado))
  .catch(error => console.error(error));

// ✓ Para múltiples promesas en paralelo:
Promise.all([
  fabricaDePromesas(1),
  fabricaDePromesas(2),
  fabricaDePromesas(3)
])
  .then(resultados => console.log("Todas completadas:", resultados))
  .catch(error => console.error("Una falló:", error));

// ✓ O la primera que termine:
Promise.race([
  fabricaDePromesas(1),
  fabricaDePromesas(2)
])
  .then(resultado => console.log("La primera:", resultado));
```

### Etapa 3: async/await

**Archivo:** `Callstack/ejemplo-asyn-await.js`

```javascript
// ✅ async/await: La sintaxis más moderna y legible
async function miAsyncFunction() {
  try {
    const resultado1 = await fabricaDePromesas(1);
    console.log(resultado1);

    const resultado2 = await fabricaDePromesas(2);
    console.log(resultado2);

    return { resultado1, resultado2 };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Llamar la función
miAsyncFunction()
  .then(resultados => console.log("Completado:", resultados))
  .catch(error => console.error("Error:", error));
```

### Comparación

| Aspecto | Callback | Promise | async/await |
|---|---|---|---|
| Sintaxis | Función como argumento | .then().catch() | await en función async |
| Legibilidad | Difícil (pyramid of doom) | Mejor que callbacks | La mejor (código síncrono) |
| Manejo de errores | Inconsistente | .catch() | try/catch |
| Paralelo | Complejo | Promise.all() | Fácil con Promise.all() |

### Patrón: Comparación Real

```javascript
// ANTES (Callback)
function cargarDatos(callback) {
  fetch('/api/datos')
    .then(r => r.json())
    .then(datos => callback(datos))
    .catch(err => callback(null, err));
}
cargarDatos((datos, error) => {
  if (error) console.error(error);
  else console.log(datos);
});

// DESPUÉS (async/await)
async function cargarDatos() {
  const respuesta = await fetch('/api/datos');
  return await respuesta.json();
}

async function main() {
  try {
    const datos = await cargarDatos();
    console.log(datos);
  } catch (error) {
    console.error(error);
  }
}
main();
```

---

## 4. Express Server — Antiguo vs Moderno

### Problema: body-parser Deprecado

**Archivo:** `servidor-post/server.js`

```javascript
// ❌ ANTES: body-parser (paquete externo innecesario)
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

**Problema:**
- Dependencia extra que se debe instalar y mantener
- Express 4.16+ lo integró internamente
- Más paquetes = más código a auditar en busca de vulnerabilidades

```javascript
// ✅ DESPUÉS: Express 4.16+ (integrado)
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

**Ventaja:**
- Sin dependencias externas innecesarias
- Mismo comportamiento
- Una línea menos de require()

### Cómo Funciona Express Bajo el Capó

Para entender Express, revisa los servidores en `nodejs/`:

```javascript
// NIVEL 0: Node.js HTTP nativo (nodejs/Index.js + request-handler.js)
const http = require('http');

const server = http.createServer((req, res) => {
  // Aquí hay que parsear manualmente:
  const url = new URL(req.url, 'http://localhost');
  const ruta = url.pathname;
  const query = Object.fromEntries(url.searchParams);

  // Hay que leer el body manualmente
  let buffer = '';
  req.on('data', chunk => buffer += chunk);
  req.on('end', () => {
    const body = JSON.parse(buffer);
    // Ahora sí podemos procesar la solicitud
  });
});

// NIVEL 1: Express (abstracción sobre Level 0)
const express = require('express');
const app = express();

app.use(express.json()); // ← Hace todo lo de arriba automáticamente
app.post('/api/datos', (req, res) => {
  // req.body ya está parseado
  res.json(req.body);
});
```

Express automáticamente:
- Parsea la URL y query string
- Lee el body del request
- Convierte JSON a objetos JavaScript
- Enruta las solicitudes al handler correcto

---

## 5. Patrón CRUD con Arrays en Memoria

### El Bug Más Común: Reasignación del Parámetro

**Archivo:** `nodejs/rutas/mascotas.js`

```javascript
// ❌ INCORRECTO: Reasignar el parámetro no muta el array original
delete: (data, callback) => {
  if (typeof data.indice !== "undefined") {
    if (mascotas[data.indice]) {
      // PROBLEMA: "mascotas =" solo cambia a qué apunta la variable local
      mascotas = mascotas.filter((_m, i) => i !== data.indice);
      return callback(204, { mensaje: "eliminado" });
    }
  }
}

// Después de esto, si haces GET, el elemento SIGUE AHÍ
// porque el array original en recursos.js no fue modificado
```

### ¿Por Qué Pasa Esto?

En JavaScript:

```javascript
// Los arrays se pasan por REFERENCIA
let original = [1, 2, 3];

function modificarConReassign(arr) {
  arr = arr.filter(x => x !== 2); // ❌ Solo cambia la variable local
}

function modificarConSplice(arr) {
  arr.splice(1, 1); // ✓ Modifica el array original
}

modificarConReassign(original);
console.log(original); // [1, 2, 3] — SIGUE IGUAL ❌

modificarConSplice(original);
console.log(original); // [1, 3] — FUE MODIFICADO ✓
```

### Solución Correcta

```javascript
// ✅ CORRECTO: Usar splice para mutar el array original
delete: (data, callback) => {
  const idx = Number(data.indice);
  if (typeof data.indice !== "undefined") {
    if (mascotas[idx]) {
      // splice modifica el array en su ubicación en memoria
      mascotas.splice(idx, 1);
      return callback(204, { mensaje: "elemento eliminado" });
    }
    return callback(404, { mensaje: "no encontrado" });
  }
  callback(400, { mensaje: "indice no enviado" });
}
```

### Métodos de Array para Mutación

```javascript
// ✓ Métodos que MUTANT el array original:
arr.push(elem);           // Agrega al final
arr.pop();                // Quita el último
arr.splice(idx, count);   // Quita count elementos a partir de idx
arr.shift();              // Quita el primero
arr.unshift(elem);        // Agrega al inicio
arr.reverse();            // Invierte el orden
arr.sort();               // Ordena

// ❌ Métodos que retornan un NUEVO array (no mutant):
const nuevo = arr.filter(x => x > 0);    // Nuevo array
const nuevo = arr.map(x => x * 2);       // Nuevo array
const nuevo = arr.slice(0, 3);           // Nuevo array
const nuevo = [...arr];                  // Copia superficial
```

---

## Seguridad: Vulnerabilidades Comunes Arregladas

### 1. Path Traversal en Subida de Archivos

**Archivo:** `capturador/Indexh.js`

```javascript
// ❌ VULNERABILIDAD: Attacker puede subir "../../server.js"
const archivo = req?.files?.archivo;
archivo.mv(`./files/${archivo.name}`, ...);

// Un atacante sube: "../../server.js"
// Resultado: sobrescribe tu servidor en la raíz del proyecto

// ✅ ARREGLADO: Sanitizar el nombre del archivo
const path = require('path');
const safeName = path.basename(archivo.name);
const destino = path.join(__dirname, 'files', safeName);
archivo.mv(destino, ...);

// path.basename('../../server.js') → 'server.js'
// path.join(__dirname, 'files', 'server.js') → '/ruta/actual/files/server.js'
```

### 2. XSS (Cross-Site Scripting)

**Archivo:** `capturador/capturador-get.js`

```javascript
// ❌ VULNERABILIDAD: Renderizar input sin escapar
const fname = req.query.fname; // Puede ser "<script>alert(1)</script>"
res.write(`<p>Nombre: ${fname}</p>`); // El script se ejecuta

// ✅ ARREGLADO: Escapar caracteres especiales
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

res.write(`<p>Nombre: ${escapeHtml(fname)}</p>`);
// "<script>alert(1)</script>" se convierte en:
// "&lt;script&gt;alert(1)&lt;/script&gt;"
// Ahora se muestra como texto, no se ejecuta ✓
```

---

## Estructura del Proyecto Refactorizado

```
Test/
├── fundamentos-js/          # JavaScript fundamentals
│   ├── funcion-constructora.js
│   ├── metodos_constructor.js
│   ├── Clousure.js
│   ├── creacioncorreo.js
│   └── ...
├── Callstack/               # Async patterns
│   ├── ejemplo-promesa.js
│   ├── promesa-allSettled.js
│   ├── ejemplo-callback-orden.js
│   ├── ejemplo-asyn-await.js
│   └── ...
├── ejemplos-ajax/           # AJAX examples
│   ├── Ejemplo-ajax.js
│   └── usuarios.json
├── capturador/              # Request capture & handling
│   ├── Indexh.js
│   └── capturador-get.js
├── nodejs/                  # Custom HTTP router (no framework)
│   ├── Index.js
│   ├── request-handler.js
│   ├── recursos.js
│   ├── enrutador.js
│   └── rutas/
│       ├── mascotas.js
│       ├── veterinarias.js
│       ├── duenos.js
│       └── consultas.js
├── servidor-post/           # Express + AJAX (JSON file storage)
│   ├── server.js
│   ├── package.json
│   └── public/
│       ├── index.html
│       └── Ejemplo-ajax.js
├── practica/                # Practice exercises
│   └── humus.js
└── GUIA-PRACTICA.md         # ← Este archivo
```

---

## Próximos Pasos

1. **Aprende los conceptos:** Lee las secciones anteriores y experimenta con el código
2. **Ejecuta los ejemplos:** Corre los archivos JavaScript con Node.js:
   ```bash
   node fundamentos-js/funcion-constructora.js
   node Callstack/ejemplo-asyn-await.js
   ```
3. **Prueba los servidores:**
   ```bash
   # Express + AJAX
   cd servidor-post && npm install && npm start
   # Visita http://localhost:3000
   ```
4. **Modifica y experimenta:** Cambia el código y ve qué sucede
5. **Lee el código refactorizado:** Entiende cómo se arreglaron los bugs

---

**¡Felicidades por completar la refactorización!** 🎉

Este repositorio es un testimonio de tu crecimiento como programador. Cada carpeta representa un paso en la escalera de JavaScript.
