const Boom = require('boom')
const uuid = require('node-uuid')
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { promisify } = require('util')
const Usuarios = require('../models/Usuarios')

const bcryptAsPromise = promisify(bcrypt.hash)

module.exports = [
    {
        method : 'GET',
        path  : '/usuarios',
        handler : (request, response) => {
            Usuarios.find((err, docs) => {
                if (err)
                    return response(Boom.wrap(err, 'Erro interno do MongoDB'))
    
                response(docs)
            })
        }
    }
,    
    {
        method : 'GET',
        path  : '/usuarios/{id}',
        handler : (request, response) => {
            Usuarios.findOne({_id : request.params.id},
                (err, doc) => {
                    if (err) 
                        return response(Boom.wrap(err, 'Erro interno do MongoDB'))
    
                    if (!doc)
                        return response(Boom.notFound())
                    
                    response(doc)
    
                })
        }
    }
 ,   
    {
        method : 'POST',
        path : '/usuarios',
        config : {
            validate : {
                payload : {
                    nome : Joi.string().min(5).max(20).required(),
                    dtcriacao : Joi.date().timestamp(),
                    email : Joi.string().min(5).max(50).email(),
                    senha : Joi.string().min(8).max(16).required(),
                    seguindo : Joi.array().items(Joi.string()),
                    seguidores : Joi.array().items(Joi.string())
                }      
            }
        },
        handler : async (request, response) => {
            const usuario = request.payload;
            if (!usuario.dtcriacao) 
                usuario.dtcriacao = new Date();
            
            if (usuario.senha) 
                usuario.senha = await bcryptAsPromise(usuario.senha, 10);
            
            usuario._id = uuid.v1();
    
            Usuarios.save(usuario, (err, result) => {
                if (err)
                    return response(Boom.wrap(err, 'Erro interno do MongoDB'))
                
                    response(result)
            })
        }
    }
,
    {
        method : 'PATCH',
        path : '/usuarios/{id}',
        config : {
            validate : {
                payload : Joi.object({
                    nome : Joi.string().min(5).max(20).optional(),
                    email : Joi.string().min(5).max(50).email(),
                    senha : Joi.string().min(8).max(16).optional(),
                    seguindo : Joi.array().items(Joi.string()).optional(),
                    seguidores : Joi.array().items(Joi.string()).optional()
                }).required().min(1)      
            }
        },
        handler : async (request, response) => {
            const usuario = request.payload;

            if (usuario.senha) {
                usuario.nome = 'abcdefgh'
                const hashSenha = await bcryptAsPromise(usuario.senha, 10);
                usuario.senha = hashSenha;
            }

            Usuarios.update({_id : request.params.id},
                {$set : usuario},
                (err, result) => {
                    if (err)
                        return response(Boom.wrap(err, 'Erro interno do MongoDB'))
                    
                    if (result.n === 0)
                        return response(Boom.notFound())

                    response().code(204);
                })
        }
    }
]