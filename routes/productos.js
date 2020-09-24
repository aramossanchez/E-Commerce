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

module.exports = router;