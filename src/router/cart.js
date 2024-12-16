const express = require("express");
const CartManager = require("../managers/cart-manager");

const router = express.Router();
const cartManager = new CartManager("./src/data/carritos.json");

router.post("/", async (req, res) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ error: "El carrito debe tener al menos un producto." });
    }

    const newCart = await cartManager.addCart({ products });
    res
      .status(201)
      .json({ message: "Carrito creado con éxito.", carrito: newCart });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Error al crear el carrito. " + error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid, 10);
    const cart = await cartManager.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "El carrito no existe." });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error al obtener el carrito." });
  }
});

// router.post("/:cid/product/:pid", async (req, res) => {
//   try {
//     const cartId = parseInt(req.params.cid, 10);
//     const productId = parseInt(req.params.pid, 10);

//     const cart = await cartManager.getCartById(cartId);
//     if (!cart) {
//       return res.status(404).json({ error: "El carrito no existe." });
//     }

//     const productIndex = cart.products.findIndex(
//       (p) => p.product === productId
//     );
//     if (productIndex !== -1) {
//       cart.products[productIndex].quantity += 1;
//     } else {
//       cart.products.push({ product: productId, quantity: 1 });
//     }
//     await cartManager.guardarArchivo(await cartManager.getCarts());
//     res
//       .status(200)
//       .json({ message: "Producto agregado al carrito.", carrito: cart });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "Error al agregar el producto al carrito." });
//   }
// });

module.exports = router;
