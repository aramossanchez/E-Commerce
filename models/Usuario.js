const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');

//CREAMOS LAS REGLAS PARA LA CREACIÓN DE USUARIO
const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    dni: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ["usuario", "vendedor", "administrador"]
    },
    contraseña: String
},

//HACEMOS QUE EN LAS BÚSQUEDAS NO SE MUESTREN LAS CONTRASEÑAS
{
    toJSON: {
        transform: function(doc,ret){
            delete ret.contraseña;
            return ret;
        }
    }
});

//CIFRAMOS CONTRASEÑA
UsuarioSchema.pre('save', async function(next){
    try {
        const usuario = this;
        usuario.contraseña = await bcrypt.hash(usuario.contraseña, 9);
        next();
    } catch (error) {
        console.error(error);
    }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;