const Compra = require('../models/Compra');
const Pedido = require ('../models/Pedido');
const Producto = require ('../models/Producto');
const Usuario = require ('../models/Usuario');

const CompraController = {
    async crearPedido(req,res){
        //SI METEMOS UN ARRAY DE DATOS PARA CREAR VARIOS PEDIDOS A LA VEZ USARA EL PRIMER TRY
        try {
            //ALMACENAMOS LOS ID DE LAS COMPRAS
            const compras = req.body;
            console.log(compras);
            var pedidosCreados = [];
            //ALMACENAMOS EN UNA VARIABLE UN PEDIDO COMPLETO EXTRAIDO DEL ARRAY CON TODOS LOS PEDIDOS
            for (i in compras){
                var pedidoCompleto = compras[i];
                console.log(pedidoCompleto);
                //EXTRAEMOS COMPRA POR COMPRA DEL ARRAY DEL PEDIDO COMPLETO
                var dni_usuario;
                var nombre_usuario;
                var direccion_usuario;
                var telefono_usuario;
                var email_usuario;
                var id_compra =[]
                var nombre_producto = [];
                var precio_producto = [];
                var precioTotal = 0;
                for (i in pedidoCompleto){
                    //GENERAMOS TODAS LAS VARIABLES NECESARIAS PARA HACER LA INSERCION EN LA BASE DE DATOS
                    var compraIndividual = pedidoCompleto[i];
                    var compra = await Compra.findById(compraIndividual.id_compra);
                    var usuario = await Usuario.findOne({dni:compra.dni_usuario});
                    var producto = await Producto.findById(compra.id_producto);
                    dni_usuario = usuario.dni;
                    nombre_usuario = usuario.nombre;
                    direccion_usuario = usuario.direccion;
                    telefono_usuario = usuario.telefono;
                    email_usuario = usuario.email;
                    id_compra.push(compra._id);
                    nombre_producto.push(producto.nombre);
                    precio_producto.push(producto.precio);
                    precioTotal = producto.precio + precioTotal;
                };
                //CREAMOS LOS DOCUMENTOS DE LA BASE DE DATOS
                const pedidos = await Pedido.create({dni_usuario: dni_usuario, nombre_usuario: nombre_usuario, direccion_usuario: direccion_usuario, telefono_usuario: usuario.telefono, email_usuario: usuario.email, id_compra: id_compra, nombre_producto: nombre_producto, precio_producto: precio_producto, precio_total: precioTotal, fecha: new Date() });
                pedidosCreados.push(pedidos)
            };
        res.send(pedidosCreados);
        } catch (error) {
            //SI METEMOS UN SOLO DOCUMENTO (SIN ARRAY) USARA EL SEGUNDO TRY
            try {
                //ALMACENAMOS LOS ID DE LAS COMPRAS
                const compras = req.body;
                //ALMACENAMOS EN UN ARRAY LOS IDS DE LOS PRODUCTOS COMPRADOS EN EL PEDIDO Y EN OTRO ARRAY LOS IDS DE LAS COMPRAS
                var idsCompras = [];
                var datosCompras = [];
                for (i in compras){
                    var compra = await Compra.findById(compras[i].id_compra);
                    idsCompras.push(compras[i].id_compra);
                    datosCompras.push(compra.id_producto);
                };
                //BUSCAMOS EL NOMBRE DEL USUARIO QUE HA REALIZADO LA COMPRA
                const usuario = await Usuario.find({dni:compra.dni_usuario});
                //ALMACENAMOS EN UN ARRAY LOS NOMBRES DE LOS PRODUCTOS COMPRADOS Y LOS PRECIOS DE LOS PRODUCTOS COMPRADOS
                var nombreProducto = [];
                var precioProducto = [];
                for (i in datosCompras){
                    var producto = await Producto.findById(datosCompras[i]);
                    nombreProducto.push(producto.nombre);
                    precioProducto.push(producto.precio);
                }
                //SUMAMOS LOS PRECIOS DE LOS PRODUCTOS PARA OBTENER EL PRECIO TOTAL DEL PEDIDO
                var precioTotal = 0;
                for (i in precioProducto){
                    var precioTotal = precioProducto[i] + precioTotal;
                };
                //GUARDAMOS EL PEDIDO EN LA BASE DE DATOS
                const pedido = await Pedido.create({dni_usuario: compra.dni_usuario, nombre_usuario: usuario[0].nombre, direccion_usuario: usuario[0].direccion, telefono_usuario: usuario[0].telefono, email_usuario: usuario[0].email, id_compra: idsCompras, nombre_producto: nombreProducto, precio_producto: precioProducto, precio_total: precioTotal, fecha: new Date() });
                res.send(pedido);
                } catch (error) {
                    console.error(error);
                    res.status(500).send({message: 'Hubo un error al crear la compra', error});
            }
        }
    },

    async buscarPedido(req,res){
        try {
            const pedido = await Pedido.find({dni_usuario:req.params.usuario});
            res.send(pedido);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al crear la compra', error});
        }
    },

    async modificarPedido(req,res){
        try {
            const pedido = await Pedido.findByIdAndUpdate(req.params.pedido, req.body, {new: true});
            res.send(pedido);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al crear la compra', error});
        }
    },
};

module.exports = CompraController;