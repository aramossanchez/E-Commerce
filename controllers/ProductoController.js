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
    },

    async buscarCategoria(req,res){
        try {
            const producto = await Producto.find({categoria:req.params.categoria});
            res.send (producto);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al registrar el producto', error});
        }
    },

    async buscarVendedor(req,res){
        try {
            const producto = await Producto.find({vendedor:req.params.vendedor});
            res.send (producto);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al registrar el producto', error});
        }
    },

    async eliminarProducto(req,res){
        try {
            const producto = await Producto.findOneAndDelete({_id:req.params.id});
            res.send (producto);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al registrar el producto', error});
        }
    },

    async modificarProducto(req,res){
        try {
            const producto = await Producto.findByIdAndUpdate(req.params.id, req.body);
            res.send (producto);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al modificar el producto', error});
        }
    },
};

module.exports = ProductoController;