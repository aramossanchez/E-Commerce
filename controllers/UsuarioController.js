const Usuario = require ('../models/Usuario');
const jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
const token = require('../config/token');
const bcrypt = require ('bcryptjs');
const mongoose =require ('mongoose');

//INDICAMOS LA CONFIGURACION DE NUESTRA CLAVE
app.set('usuario', token.usuario);
app.set('vendedor', token.vendedor);

const UsuarioController = {
    async registrarUsuario(req,res){
        try {
            const usuario = await Usuario.create(req.body);
            res.send({usuario, message: 'Usuario registrado correctamente'});
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al registrar el usuario', error});
        }
    },
    async buscarUsuario(req,res){
        try {
            const usuario = await Usuario.findById(req.params.id);
            usuario.dni = undefined;
            res.send (usuario);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al buscar el perfil del usuario seleccionado', error});
        }
    },

    async modificarUsuario(req,res){
        try {
            const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.send (usuario);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al modificar los datos del usuario', error});
        }
    },

    async iniciarSesion(req,res){
        try {
            const usuario = await Usuario.findOne({dni: req.body.dni});
            const clave = await bcrypt.compare(req.body.contraseña, usuario.contraseña);
            if(req.body.dni === usuario.dni && clave) {
                if(usuario.rol === 'vendedor'){
                    const payload = {
                        check:  true
                    };
                    const token = jwt.sign(payload, app.get('vendedor'), {
                        expiresIn: 1440
                    });
                    res.json({
                        mensaje: 'Autenticación correcta, bienvenido ' + usuario.nombre + ' ' + usuario.apellidos + ', has iniciado sesión como ' + usuario.rol,
                        token: token
                    });
                } else if(usuario.rol === 'usuario'){
                    const payload = {
                    check:  true
                    };
                    const token = jwt.sign(payload, app.get('usuario'), {
                        expiresIn: 1440
                    });
                    res.json({
                        mensaje: 'Autenticación correcta, bienvenido ' + usuario.nombre + ' ' + usuario.apellidos + ', has iniciado sesión como ' + usuario.rol,
                    token: token
                    });
                };
            } else {
                res.json({ mensaje: "Usuario o contraseña incorrectos"})
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al buscar el perfil del usuario seleccionado', error});
        }
    }
};

module.exports = UsuarioController;