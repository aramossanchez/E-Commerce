const mongoose = require ('mongoose');

//CREAMOS LAS REGLAS PARA LA CREACIÓN DE PRODUCTOS
const ProductoSchema = new mongoose.Schema({
    nombre: String,
    foto: String,
    tipo: {
        type: String,
        enum: ["funko", "periferico", "varios"],
        default: "varios"
    },
    vendedor: String,
    precio: Number,
    categoria: [],
    vendidos: {
        type: Number,
        default: 0
    }
});

const Producto = mongoose.model('Producto', ProductoSchema);

module.exports = Producto;