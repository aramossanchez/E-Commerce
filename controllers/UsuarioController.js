const Usuario = require ('../models/Usuario');
const UsuarioController = {
    async registrarUsuario(req,res){
        try {
            const usuario = await Usuario.create(req.body);
            res.send({usuario, message: 'Usuario registrado correctamente'});
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al registrar el usuario', error});
        }
    },
    async buscarUsuario(req,res){
        try {
            const usuario = await Usuario.findById(req.params.id);
            res.send (usuario);
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Hubo un error al buscar el perfil del usuario seleccionado', error});
        }
    }
};

module.exports = UsuarioController;