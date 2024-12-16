const fs = require("fs").promises;

const ProductManager = require("./product-manager");
//puedo crear una instancia:
const pmanager = new ProductManager("./src/data/productos.json");

//import {promises as fs} from "fs"

//Al trabajar con ESmodules: import {promises as fs} from "fs";

class CartManager {
  static ultId = 0;
  constructor(path) {
    //this.carts = [];
    this.path = path;
  }

  async addCart({ products }) {
    const savedCarts = await this.leerArchivo();

    if (!Array.isArray(products) || products.leng === 0) {
      throw new Error("El carrito debe contener un producto o más");
    }

    const registeredProducts = await pmanager.getproducts();

    products.forEach((p) => {
      if (!registeredProducts.some((rp) => rp.id == p.id)) {
        throw new Error("producto no registrado");
      }
    });

    const nuevoCarrito = {
      id: ++CartManager.ultId,
      products: products,
    };
    savedCarts.push(nuevoCarrito);

    await this.guardarArchivo(savedCarts);

    return nuevoCarrito;
  }

  async getCarts() {
    const arrayCarts = await this.leerArchivo();
    return arrayCarts;
  }

  async getCartById(id) {
    //(en el parentesis va ID)
    // Primero se lee el archivo y se genera el array:
    const arrayCarts = await this.leerArchivo();
    const cart = arrayCarts.find((item) => item.id === id);

    if (!cart) {
      throw new Error("cart not found");
    } else {
      return cart;
    }
  }

  async guardarArchivo(array) {
    try {
      await fs.writeFile(this.path, JSON.stringify(array, null, 2));
    } catch (error) {
      console.log("Tenemos un error al guardar el archivo");
      console.error(error); //agregado
    }
  }

  async leerArchivo() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayCarts = JSON.parse(respuesta);
      arrayCarts.sort((a, b) => a.id - b.id);
      CartManager.ultId =
        arrayCarts.length > 0 ? arrayCarts[arrayCarts.length - 1].id : 0;
      return arrayCarts;
    } catch (error) {
      console.log("Tenemos un error al leer el archivo", error);
      //return;
    }
  }
}

module.exports = CartManager;
