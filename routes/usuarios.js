const express = require('express');
const router = express.Router();
const UsuarioController = require ('../controllers/UsuarioController');
const Usuario = require('../models/Usuario');

//PÁGINA DE INICIO DE USUARIOS
router.get('/', function(req, res, next) {
    res.send('Aquí podremos ver y gestionar todo lo referente a los usuarios');
  });

//REGISTRAMOS USUARIO
router.post('/', UsuarioController.registrarUsuario);

//BUSCAMOS USUARIOS POR ID
router.get('/buscar/:id', UsuarioController.buscarUsuario);

module.exports = router;

