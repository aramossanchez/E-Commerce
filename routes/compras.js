const express = require('express');
const router = express.Router();
const CompraController = require ('../controllers/CompraController');
const accesoTokenVendedores = require('../config/accesoTokenVendedores');

//REALIZAR UNA NUEVA COMPRA
router.post('/crear', CompraController.crearCompra);

//MOSTRAMOS TODAS LAS COMPRAS
router.get('/buscar', CompraController.mostrarCompras);

//MOSTRAMOS COMPRAS POR DNI DE USUARIO (MODO FACTURA)
router.get('/buscar/:usuario', CompraController.mostrarComprasUsuario);

module.exports = router;