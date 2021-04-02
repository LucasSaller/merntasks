const { request } = require("express");
const express = require("express");
const conectarDB = require("./config/db");

// crear servidor
const app = express();
// conectar a la DB
conectarDB();
// puerto de la app
const PORT = process.env.PORT || 4000;

// Importar rutas

app.use("/api/usuarios", require("./routes/usuarios"));

//arrancar la app
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// definir la pag principal

app.get("/", (request, response) => {
  response.send("Hola mundo");
});
