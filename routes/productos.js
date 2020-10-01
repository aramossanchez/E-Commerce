const express = require('express');
const router = express.Router();
const ProductoController = require ('../controllers/ProductoController');
const Producto = require('../models/Producto');

//PAGINA INICIAL DE PRODUCTOS
router.get('/', function(req, res, next) {
  res.send('Aquí podremos ver y gestionar todo lo referente a nuestros productos');
});

//CREAMOS PRODUCTO A TRAVÉS DE UN BODY
router.post('/', ProductoController.crearProducto);

//VEMOS TODOS LOS PRODUCTOS CREADOS
router.get('/buscar', ProductoController.verTodos);

//BUSCAMOS PRODUCTOS A TRAVÉS DE SU CATEGORÍA
router.get('/buscar/categoria/:categoria', ProductoController.buscarCategoria);

//BUSCAMOS PRODUCTOS A TRAVÉS DE SU VENDEDOR
router.get('/buscar/vendedor/:vendedor', ProductoController.buscarVendedor);

//BUSCAMOS POR ID Y ELIMINAMOS PRODUCTO
router.get('/eliminar/:id', ProductoController.eliminarProducto);

//BUSCAMOS POR ID Y ACTUALIZAMOS PRODUCTO POR BODY
router.post('/modificar/:id', ProductoController.modificarProducto);

module.exports = router;