const Boom = require('boom')
const uuid = require('node-uuid')
const Joi = require('joi')
const Projetos = require('../models/Projetos')

module.exports = [
    {
        method : 'GET',
        path  : '/projetos',
        handler : (request, response) => {
            Projetos.find((err, docs) => {
                if (err)
                    return response(Boom.wrap(err, 'Erro interno do MongoDB'))
    
                response(docs)
            })
        }
    }
,    
    {
        method : 'GET',
        path  : '/projetos/{id}',
        handler : (request, response) => {
            Projetos.findOne({_id : request.params.id},
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
        path : '/projetos',
        config : {
            validate : {
                payload : {
                    nome : Joi.string().min(5).max(20).required(),
                    progresso : Joi.number().min(0).max(100).required(),
                    dtcriacao : Joi.date().timestamp()
                }      
            }
        },
        handler : (request, response) => {
            const projeto = request.payload;
            if (!projeto.dtcriacao) 
                projeto.dtcriacao = new Date();
    
            projeto._id = uuid.v1();
    
            Projetos.save(projeto, (err, result) => {
                if (err)
                    return response(Boom.wrap(err, 'Erro interno do MongoDB'))
                
                    response(result)
            })
        }
    }
,
    {
        method : 'PATCH',
        path : '/projetos/{id}',
        config : {
            validate : {
                payload : Joi.object({
                    nome : Joi.string().min(5).max(20).optional(),
                    progresso : Joi.number().min(0).max(100).optional()
                }).required().min(1)      
            }
        },
        handler : (request, response) => {
            Projetos.update({_id : request.params.id},
                {$set : request.payload},
                (err, result) => {
                    if (err)
                        return response(Boom.wrap(err, 'Erro interno do MongoDB'))
                    
                    if (result.n === 0)
                        return response(Boom.notFound())

                    response().code(204);
                })
        }
    }
,
    {  
        method: 'DELETE',
        path: '/projetos/{id}',
        handler: (request, response) => {
    
            Projetos.remove({
                _id: request.params.id
            }, (err, result) => {
    
                if (err) {
                    return reply(Boom.wrap(err, 'Erro interno do MongoDB'));
                }
    
                if (result.n === 0) {
                    return reply(Boom.notFound());
                }
    
                response().code(204);
            });
        }
    }
]