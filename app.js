const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const PUERTO = 8080;

//Importamos el productManager:
//const ProductManager = require("./src/managers/product-manager");
//puedo crear una instancia:
//const manager = new ProductManager("./src/data/productos.json");
const productRouter = require("./src/router/product");
const cartRouter = require("./src/router/cart");

//Rutas
app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

//listen

app.listen(PUERTO, () => {
  console.log(`escuchando el puerto: http//localhost:${PUERTO}`);
});
