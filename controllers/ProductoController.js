const Producto = require ('../models/Producto');
const ProductoController = {
    async crearProducto(req,res){
        try {
            const producto = await Producto.create(req.body);
            res.send({producto, message: 'Producto creado'});
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al registrar el producto', error});
        }
    },
    async verTodos(req,res){
        try {
            const productos = await Producto.find();
            res.send (productos);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al registrar el producto', error});
        }
    }
};

module.exports = ProductoController;