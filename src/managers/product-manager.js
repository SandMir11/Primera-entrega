const fs = require("fs").promises;

//import {promises as fs} from "fs"

//Al trabajar con ESmodules: import {promises as fs} from "fs";

// Actividad 1 y 2

class ProductManager {
  static ultId = 0;
  constructor(path) {
    //this.products = [];
    this.path = path;
    //La clase debe contar con una variable this.path, el cual se inicializará desde el constructor
    //y debe recibir la ruta a trabajar desde el momento de generar su instancia.
  }

  async addProduct({
    title,
    description,
    price,
    img,
    code,
    stock,
    status,
    category,
    thumbnails,
  }) {
    //le quite las llaves

    //se puede leer el archivo y guardar el array con los productos:
    const arrayProductos = await this.leerArchivo();

    //Se valida que se agreguen todos los campos.

    if (
      !title ||
      !description ||
      !price ||
      !img ||
      !code ||
      !stock ||
      !stock ||
      !category ||
      !thumbnails
    ) {
      //verifica que el producto no se a vacio
      console.log("Todos los campos son obligatorios");

      return;
    }
    //Se valida que el codigo sea único:
    if (arrayProductos.some((item) => item.code === code)) {
      console.log("Este producto ya existe");
      return;
    }
    const nuevoProducto = {
      id: ++ProductManager.ultId,
      title,
      description,
      price,
      img,
      code,
      stock,
      status,
      category,
      thumbnails,
    };
    arrayProductos.push(nuevoProducto);

    // una vez que agregamos un producto al array, guardamos el array al archivo:
    await this.guardarArchivo(arrayProductos);
  }

  async getproducts() {
    const arrayProductos = await this.leerArchivo();
    return arrayProductos;
  }

  async getProductById(id) {
    //(en el parentesis va ID)
    // Primero se lee el archivo y se genera el array:
    const arrayProductos = await this.leerArchivo();
    const producto = arrayProductos.find((item) => item.id === id);

    if (!producto) {
      throw new Error("product not found");
    } else {
      return producto;
    }
  }

  async updateProduct(
    id,
    {
      title,
      description,
      price,
      img,
      code,
      stock,
      status,
      category,
      thumbnails,
    }
  ) {
    const productos = getproducts();
    const product = productos.find((item) => item.id === id);

    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (img) product.img = img;
    if (code) product.code = code;
    if (stock) product.stock = stock;
    if (category) product.category = category;
    if (thumbnails) product.thumbnails = thumbnails;

    await this.guardarArchivo(productos);
  }

  async deleteProductById(id) {
    try {
      // Leer el archivo y obtener los productos
      const arrayProductos = await getproducts();

      // Filtrar los productos para eliminar el que coincida con el ID
      const productosFiltrados = arrayProductos.filter(
        (item) => item.id !== id
      );

      // Verificar si se eliminó algún producto
      if (arrayProductos.length === productosFiltrados.length) {
        console.log(`Producto con id ${id} no encontrado.`);
        return;
      }

      // Guardar el nuevo array en el archivo
      await this.guardarArchivo(productosFiltrados);
      console.log(`Producto con id ${id} eliminado exitosamente.`);
    } catch (error) {
      console.log("Error al eliminar el producto.");
      console.error(error);
    }
  }

  //Se pueden armar unos metodos auxiliares que guarden el archivo y recuperen los datos.

  async guardarArchivo(arrayProductos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.log("Tenemos un error al guardar el archivo");
      console.error(error); //agregado
    }
  }

  async leerArchivo() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("Tenemos un error al leer el archivo", error);
      //return;
    }
  }
}

module.exports = ProductManager;
