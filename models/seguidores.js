const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SeguidoresSchema = new Schema({
    usuarioid: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    },
    seguidores: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        unique: true
    }]
});

module.exports = mongoose.model('Seguidores', SeguidoresSchema);