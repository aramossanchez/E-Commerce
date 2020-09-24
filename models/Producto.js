const mongoose = require ('mongoose');

//CREAMOS LAS REGLAS PARA LA CREACIÓN DE PRODUCTOS
const ProductoSchema = new mongoose.Schema({
    nombre: String,
    foto: String,
    tipo: {
        type: String,
        enum: ["funko", "videojuego", "accesorio"]
    },
    vendedor: String,
    precio: Number,
    categoria: []
});

const Producto = mongoose.model('Producto', ProductoSchema);

module.exports = Producto;