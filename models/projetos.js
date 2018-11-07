const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjetosSchema = new Schema({
    nome : { type : String, 
             trim : true , 
             required : true
    },
    dtcriacao : { type : Date, 
                  required : true
    },
    progresso : { type : Number, 
                  min : [0, 'O progresso mínimo é 0%'], 
                  max : [100, 'O progresso mínimo é 100%']
    },
    posts: [{ 
        type : Schema.Types.ObjectId, 
        ref: 'Posts'
     }]
});

module.exports = mongoose.model('Projetos', ProjetosSchema);