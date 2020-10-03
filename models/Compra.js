const mongoose = require ('mongoose');

//CREAMOS LAS REGLAS PARA LA CREACIÓN DE COMPRA
const CompraSchema = new mongoose.Schema({
    id_producto: {
        type: String,
        required: true
    },
    dni_usuario: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    }
});

const Compra = mongoose.model('Compra', CompraSchema);

module.exports = Compra;