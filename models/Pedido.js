const mongoose = require ('mongoose');

//CREAMOS LAS REGLAS PARA LA CREACIÓN DE COMPRA
const PedidoSchema = new mongoose.Schema({
    dni_usuario: {
        type: String,
        required: true
    },
    nombre_usuario: {
        type: String,
        required: true
    },
    direccion_usuario:{
        type: String,
        required: true
    },
    telefono_usuario:{
        type: Number,
        required: true
    },
    email_usuario: {
        type: String,
        required: true
    },
    id_compra: [],
    nombre_producto: [{
        type: String,
        required: true
    }],
    
    precio_producto: [{
        type: Number,
        required: true
    }],
    precio_total:{
        type:Number,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    }
});

const Pedido = mongoose.model('Pedido', PedidoSchema);

module.exports = Pedido;