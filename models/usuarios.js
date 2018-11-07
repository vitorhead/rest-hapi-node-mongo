const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UsuariosSchema = new Schema({
    nome : { type : String , trim : true , required : true},
    dtcriacao : { type : Date , required : true},
    email : { type : String , trim : true , unique : true, required : true},
    senha : { type : String , trim : true , required : true},
    seguindo : [
        { nome : String , id : String }
    ],
    seguidores : [
        { nome : String , id : String }
    ]
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);