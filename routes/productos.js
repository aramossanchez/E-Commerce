const express = require('express');
const router = express.Router();
const ProductoController = require ('../controllers/ProductoController');
const accesoTokenVendedores = require('../config/accesoTokenVendedores');

//PAGINA INICIAL DE PRODUCTOS
router.get('/', function(req, res, next) {
  res.send('Aquí podremos ver y gestionar todo lo referente a nuestros productos');
});

//VEMOS TODOS LOS PRODUCTOS CREADOS
router.get('/buscar', ProductoController.verTodos);

/////////////////////////////////////////
//VER LOS PRODUCTOS ORDENADOS POR PRECIOS
/////////////////////////////////////////

//ORDENAMOS PRODUCTOS DE MENOS A MAYOR
router.get('/ordenar/precio/ascendente', ProductoController.precioAscendente);

//ORDENAMOS PRODUCTOS DE MENOS A MAYOR
router.get('/ordenar/precio/descendente', ProductoController.precioDescendente);

/////////////////////////////////////////
//VER LOS PRODUCTOS ORDENADOS POR NOMBRE
/////////////////////////////////////////

//ORDENAMOS PRODUCTOS POR ORDEN ALFABETICO
router.get('/ordenar/nombre/ascendente', ProductoController.nombreAscendente);

//ORDENAMOS PRODUCTOS POR ORDEN ALFABETICO INVERSO
router.get('/ordenar/precio/descendente', ProductoController.nombreDescendente);

////////////////////////////////////////
//VER LOS PRODUCTOS ORDENADOS POR VENTAS
////////////////////////////////////////

//ORDENAMOS PRODUCTOS POR ORDEN DE VENTAS (MÁS VENDIDOS)
router.get('/ordenar/ventas/descendente', ProductoController.masVendidos);

//ORDENAMOS PRODUCTOS POR ORDEN DE VENTAS (MENOS VENDIDOS)
router.get('/ordenar/ventas/ascendente', ProductoController.menosVendidos);

//BUSCAMOS PRODUCTOS A TRAVÉS DE SU CATEGORÍA
router.get('/buscar/categoria/:categoria', ProductoController.buscarCategoria);

//BUSCAMOS PRODUCTOS A TRAVÉS DE SU VENDEDOR
router.get('/buscar/vendedor/:vendedor', ProductoController.buscarVendedor);

///////////////////////////////////////////////////////////////////////////////////////////////
//CRUD EN EL QUE NECESITAMOS UN TOKEN DE VENDEDOR PARA PODER ACCEDER A LOS DIFERENTES ENDPOINTS
///////////////////////////////////////////////////////////////////////////////////////////////

//CREAMOS PRODUCTO A TRAVÉS DE UN BODY
router.post('/crear', accesoTokenVendedores, ProductoController.crearProducto);

//BUSCAMOS POR ID Y ELIMINAMOS PRODUCTO
router.get('/eliminar/:id', accesoTokenVendedores ,ProductoController.eliminarProducto);

//BUSCAMOS POR ID Y ACTUALIZAMOS PRODUCTO POR BODY
router.post('/modificar/:id', accesoTokenVendedores ,ProductoController.modificarProducto);

module.exports = router;