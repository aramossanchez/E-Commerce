const express = require('express');
const router = express.Router();
const ProductoController = require ('../controllers/ProductoController');
const Producto = require('../models/Producto');

/* GET users listing. */
router.post('/', ProductoController.crearProducto);

router.get('/', function(req, res, next) {
  res.send('Aquí podremos ver y gestionar todo lo referente a nuestros productos');
});

router.get('/buscar', ProductoController.verTodos);

module.exports = router;