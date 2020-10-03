const express = require('express');
const router = express.Router();
const PedidoController = require ('../controllers/PedidoController');
const accesoTokenVendedores = require('../config/accesoTokenVendedores');

//REALIZAR UNA NUEVA COMPRA
router.post('/crear', PedidoController.crearPedido);

//MODIFICAR DATOS DE PEDIDO (SOLO PUEDE HACERLO EL VENDEDOR)
router.post('/modificar/:pedido', accesoTokenVendedores, PedidoController.modificarPedido);

//BUSCAR PEDIDOS POR DNI DE USUARIO
router.get('/buscar/:usuario', PedidoController.buscarPedido);

module.exports = router;