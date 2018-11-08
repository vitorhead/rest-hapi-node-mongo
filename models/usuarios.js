const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var UsuariosSchema = new Schema({
//     nome : { type : String , trim : true , required : true},
//     dtcriacao : { type : Date , required : true},
//     email : { type : String , trim : true , unique : true, required : true},
//     senha : { type : String , trim : true , required : true},
//     seguindo : [
//         { nome : String , id : String }
//     ],
//     seguidores : [
//         { nome : String , id : String }
//     ]
// });

const UsuariosSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    }
})

module.exports = mongoose.model('Usuarios', UsuariosSchema);