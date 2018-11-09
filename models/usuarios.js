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
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    photo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false
    }
    // followers: [{
    //     usuarioid: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Usuarios'
    //     },
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     photo: {
    //         type: String,
    //         required: true
    //     }
    // }],
    // following: [{
    //     usuarioid: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Usuarios'
    //     },
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     photo: {
    //         type: String,
    //         required: true
    //     }
    // }]
})

module.exports = mongoose.model('Usuarios', UsuariosSchema);