const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SeguindoSchema = new Schema({
    usuarioid: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    },
    seguindo: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        unique: true
    }]
});

module.exports = mongoose.model('Seguindo', SeguindoSchema);