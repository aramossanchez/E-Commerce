const Compra = require ('../models/Compra');
const Producto = require ('../models/Producto');
const Usuario = require ('../models/Usuario');

const CompraController = {
    async crearCompra(req,res){
        //SI METEMOS UN ARRAY DE DATOS PARA CREAR VARIAS COMPRAS A LA VEZ USARA EL PRIMER TRY
        try {
            var comprasCreadas = [];
            //ALMACENAMOS LOS IDS DE PRODUCTO Y LOS DNI DE LOS USUARIOS QUE COMPRARON EL PRODUCTO
            const datosCompras = await req.body;
            //ALMACENAMOS EN ARRAYS LOS PRECIOS DE LOS PRODUCTOS COMPRADOS Y LOS IDS DE LOS PRODUCTOS COMPRADOS
            var precios = [];
            var productos = [];
            for (i in datosCompras){
                const busquedaProducto = await Producto.findById(datosCompras[i].id_producto);
                const precioProducto = busquedaProducto.precio;
                precios.push(precioProducto);
                productos.push (datosCompras[i].id_producto);
            }
            //GUARDAMOS TODOS LOS DATOS NECESARIOS DEL DOCUMENTO EN LA BASE DE DATOS
            for (i in productos){
                const compras = await Compra.create({id_producto: productos[i], dni_usuario:datosCompras[i].dni_usuario, precio:precios[i], fecha:new Date()});
                const ventasAumentadas = await Producto.findByIdAndUpdate(productos[i], {$inc:{vendidos:+1}});
                comprasCreadas.push(compras);
            }
            res.send(comprasCreadas);
        } catch (error) {
            //SI METEMOS UN SOLO DOCUMENTO (SIN ARRAY) USARA EL SEGUNDO TRY
            try {
                const datosCompra = req.body;
                const datosProducto = await Producto.findById(datosCompra.id_producto);
                const compra = await Compra.create({id_producto: datosProducto._id, dni_usuario:datosCompra.dni_usuario, precio:datosProducto.precio, fecha:new Date()});
                const ventaAumentada = await Producto.findByIdAndUpdate(datosProducto._id, {$inc:{vendidos:+1}});
                res.send(compra);
            } catch (error) {
                console.error(error);
                res.status(500).send({message: 'Hubo un error al crear la compra', error});
            }
            
        }
    },

    async mostrarCompras(req,res){
        try {
            const compras = await Compra.find();
            res.send(compras);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al crear la compra', error});
        }
    },

    async mostrarComprasUsuario(req,res){
        try {
            const compras = await Compra.find({dni_usuario:req.params.usuario});
            var datosFactura=[];
            for(i in compras){
                var producto = await Producto.find({_id:compras[i].id_producto});
                console.log(producto);
                var usuario = await Usuario.find({dni:compras[i].dni_usuario});
                console.log(usuario);
                datosFactura.push(compras[i]._id);
                datosFactura.push(compras[i].precio);
                datosFactura.push(usuario);
                datosFactura.push(producto);
            };
            res.send(datosFactura);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al crear la compra', error});
        }
    }
};

module.exports = CompraController;