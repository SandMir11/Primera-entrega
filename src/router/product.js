const express = require("express");
const router = express.Router();
//Importamos el productManager:
const ProductManager = require("../managers/product-manager");
//puedo crear una instancia:
const manager = new ProductManager("./src/data/productos.json");

router.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  const productoBuscado = await manager.getProductById(parseInt(id));
  res.send(productoBuscado);
});

router.get("/", async (req, res) => {
  const products = await manager.getproducts();
  res.send(products);
});

router.post("/", async (req, res) => {
  const product = req.body;
  await manager.addProduct(product);
  res.send(product);
});

router.delete("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid); // Convertir el ID a número
  try {
    await manager.deleteProductById(pid);
    res.end();
  } catch (error) {
    res.status(500).end();
  }
});

module.exports = router;
