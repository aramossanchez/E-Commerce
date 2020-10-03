var express = require('express');
var app = express();
const jwt = require('jsonwebtoken');
const token = require('./token');

app.set('vendedor', token.vendedor);

const accesoTokenVendedores = express.Router(); 


accesoTokenVendedores.use((req, res, next) => {
    const token = req.headers['token-acceso'];
    if (token) {
      jwt.verify(token, app.get('vendedor'), (err, decoded) => {      
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

 module.exports = accesoTokenVendedores;