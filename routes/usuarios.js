const express = require('express');
const router = express.Router();
const UsuarioController = require ('../controllers/UsuarioController');


//PÁGINA DE INICIO DE USUARIOS
router.get('/', function(req, res, next) {
    res.send('Aquí podremos ver y gestionar todo lo referente a los usuarios');
  });

//REGISTRAMOS USUARIO
router.post('/registro', UsuarioController.registrarUsuario);

//BUSCAMOS USUARIOS POR ID
router.get('/buscar/:id', UsuarioController.buscarUsuario);

//INICIAMOS SESION Y GENERAMOS TOKEN
router.post('/login', UsuarioController.iniciarSesion);

//MODIFICAMOS DATOS DEL USUARIO
router.post('/modificar/:id', UsuarioController.modificarUsuario);

module.exports = router;

