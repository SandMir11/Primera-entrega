# Manejador de Productos y Carrito de Compras

## Descripción del Proyecto
Aplicación básica para gestionar un catálogo de productos y un carrito de compras. Permite:

- Crear, leer, actualizar y eliminar productos.
- Agregar, visualizar productos del carrito.

## Tecnologías
- Node.js, Express, Postman, JSON

## Instalación
1. Clona el repositorio y accede al directorio:
   ```bash
   git clone git@github.com:SandMir11/Primera-entrega.git
   cd Primera-entrega
   ```
2. Instala dependencias:

   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   node app.js
   ```

## Endpoints Principales
### Productos
- GET /api/productos
- POST /api/productos
- PUT /api/productos/:id
- DELETE /api/productos/:id

### Carrito
- POST /api/cart
- GET /api/carrito/:id

Autor: Sandra Miranda - backend I
