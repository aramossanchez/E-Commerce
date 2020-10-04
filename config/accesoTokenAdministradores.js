var express = require('express');
var app = express();
const jwt = require('jsonwebtoken');
const token = require('./token');

app.set('administrador', token.administrador);

const accesoTokenAdministradores = express.Router(); 


accesoTokenAdministradores.use((req, res, next) => {
    const token = req.headers['token-acceso'];
    if (token) {
      jwt.verify(token, app.get('administrador'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

 module.exports = accesoTokenAdministradores;