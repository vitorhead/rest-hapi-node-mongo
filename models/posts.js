const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostsSchema = new Schema({
    descricao: {
        type: String,
        trim: true,
        required: true
    },
    dtcriacao: {
        type: Date,
        required: true
    },
    qtcurtidas: {
        type: Number,
        min: [0, "O mínimo de curtidas é 0!"],
        default: 0
    },
    usuario: {
        name: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: true
        },
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Usuarios'
        }
    },
    projetoid: {
        type: Schema.Types.ObjectId,
        ref: 'Projetos'
    },
    comentarios: [{
        usuario: {
            name: {
                type: String,
                required: true
            },
            photo: {
                type: String,
                required: true
            },
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'Usuarios'
            }
        },
        texto: {
            type: String,
            trim: true,
            required: true
        },
        dtcriacao: {
            type: Date,
            default: new Date()
        }
    }]
});

module.exports = mongoose.model('Posts', PostsSchema);