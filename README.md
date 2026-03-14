# Repositorio de Aprendizaje — JavaScript y Node.js

¡Hola! Soy Lautaro y este es mi repositorio dedicado a practicar y mejorar mis habilidades de programación en **JavaScript**, **Node.js** y desarrollo web.

> **📚 Lee la [Guía Práctica](./GUIA-PRACTICA.md)** para entender los conceptos clave con ejemplos antes/después.

---

## 📁 Estructura del Proyecto

Este repositorio cubre los fundamentos de JavaScript desde lo básico hasta conceptos avanzados:

### 🔹 `fundamentos-js/` — JavaScript Fundamentals
Conceptos básicos de JavaScript: closures, funciones constructoras, objetos, métodos.

**Archivos clave:**
- `Clousure.js` — Encapsulación con closures y datos privados
- `funcion-constructora.js` — Funciones constructoras vs clases ES6
- `metodos_constructor.js` — Métodos y binding de `this`
- `creacioncorreo.js` — Iteración sobre objetos

### 🔹 `Callstack/` — Async & Call Stack
Cómo JavaScript maneja la asincronía: callbacks, promises, async/await.

**Archivos clave:**
- `ejemplo-callback-orden.js` — Callbacks y orden de ejecución
- `ejemplo-promesa.js` — Promise.race() y Promise.all()
- `promesa-allSettled.js` — Promise.allSettled() para múltiples promesas
- `ejemplo-asyn-await.js` — Modern async/await syntax

### 🔹 `ejemplos-ajax/` — AJAX y Comunicación HTTP
Comunicación cliente-servidor con XMLHttpRequest y Fetch API.

### 🔹 `capturador/` — Manejo de Requests
Servidores HTTP que capturan y procesan solicitudes.

**Archivos clave:**
- `Indexh.js` — Servidor Express con manejo de archivos
- `capturador-get.js` — Servidor HTTP nativo con query parameters

### 🔹 `nodejs/` — Ruteo Personalizado (Sin Framework)
Implementación de un servidor HTTP personalizado con ruteo y CRUD.

**Estructura:**
- `Index.js` — Punto de entrada del servidor
- `request-handler.js` — Parser de requests y router
- `enrutador.js` — Mapeo de rutas a handlers
- `recursos.js` — Data store en memoria
- `rutas/` — Handlers CRUD para cada recurso

**Recursos disponibles:**
- `mascotas.js` — CRUD de mascotas
- `veterinarias.js` — CRUD de veterinarias
- `duenos.js` — CRUD de dueños
- `consultas.js` — CRUD de consultas veterinarias

### 🔹 `servidor-post/` — Express + AJAX
Servidor Express moderno con Fetch API y almacenamiento en JSON.

**Uso:**
```bash
cd servidor-post
npm install
npm start
# Abre http://localhost:3000
```

### 🔹 `practica/` — Ejercicios Prácticos
Pequeños programas para practicar conceptos específicos.

---

## 🚀 Cómo Ejecutar

### Requisitos
- Node.js v14+ instalado

### Proyectos Node.js

**Servidor Express (recomendado):**
```bash
cd servidor-post
npm install
npm start
# Abre http://localhost:3000
```

**Servidor Personalizado (para entender cómo funciona un servidor):**
```bash
cd nodejs
node Index.js
# Abre http://localhost:3000
```

### Ejemplos de JavaScript (Node.js)
```bash
node fundamentos-js/funcion-constructora.js
node Callstack/ejemplo-asyn-await.js
node practica/humus.js
```

---

## 📚 Guía de Aprendizaje

### Para Principiantes
1. Lee `fundamentos-js/` — entiende closures, constructores, objetos
2. Lee `Callstack/ejemplo-callback-orden.js` — entiende async
3. Continúa con promises y async/await

### Para Intermedio
1. Explora `nodejs/` — entiende cómo funciona HTTP
2. Revisa `capturador/Indexh.js` — aprende Express básico
3. Estudia el patrón CRUD en `nodejs/rutas/`

### Para Avanzado
1. Lee la [Guía Práctica](./GUIA-PRACTICA.md) — profundiza en cada concepto
2. Modifica el código y experimenta
3. Implementa nuevas rutas en el servidor Node.js

---

## 🔧 Cambios Recientes (Refactorización)

Este proyecto fue completamente refactorizado con prácticas modernas:

✅ **Bugs Corregidos:**
- Delete en CRUD ahora muta correctamente el array original
- XSS (Cross-Site Scripting) vulnerabilidades corregidas
- Path traversal en subida de archivos solucionado

✅ **Modernización:**
- XMLHttpRequest → Fetch API + async/await
- url.parse() → new URL()
- body-parser → express.json() (integrado)

✅ **Mejoras de Código:**
- Naming consistente (camelCase para variables)
- Estricta igualdad (=== en lugar de ==)
- Estructura organizada de directorios
- Archivos con nombres legibles (sin espacios ni typos)

Revisa [GUIA-PRACTICA.md](./GUIA-PRACTICA.md) para ejemplos **antes/después** de cada cambio.

---

## 📝 Notas

- Todos los servidores corren en `localhost:3000`
- Los datos en memoria se pierden al reiniciar el servidor
- Los ejercicios usan datos ficticios (veterinarios, mascotas, etc.)

---

## 🤝 Feedback

Si encuentras errores o tienes sugerencias, no dudes en abrir un issue.

---

**¡Felicidades por llegar hasta aquí!** Este repositorio es prueba de tu dedicación al aprendizaje. 🎓 

