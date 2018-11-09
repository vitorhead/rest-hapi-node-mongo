const Boom = require('boom')
const Projetos = require('../models/Projetos')
const Joi = require('joi')
const { promisify } = require('util')

module.exports = [
    {
        method: 'GET',
        path: '/projetos/toprated',
        handler: (request, response) => {
            const { toprated } = request.query
            Projetos.find((err, docs) => {
                if (err)
                    return response(Boom.wrap(err, 400, 'Erro ao buscar projetos'))

                response(docs)
            })
                .sort({ qtcurtidas: 'desc' })
                .limit(10)
        }
    }
    ,
    {
        method: 'GET',
        path: '/projetos/usuario/{usuarioId}',
        handler: (request, response) => {
            const { usuarioId } = request.params
            Projetos.find({ usuarioid: usuarioId }, (err, docs) => {
                if (err)
                    return response(Boom.wrap(err, 400, 'Erro ao buscar projetos'))

                response(docs)
            })
                .sort({ dtcriacao: 'asc' })
                .limit(1)
        },
        config: {
            validate: {
                params: {
                    usuarioId: Joi.string().required()
                }
            }
        }
    }
    ,
    {
        method: 'GET',
        path: '/projetos',
        handler: (request, response) => {
            const { ignorar, limitar } = request.query
            Projetos.find((err, docs) => {
                if (err)
                    return response(Boom.wrap(err, 400, 'Erro ao buscar projetos'))

                response(docs)
            })
                .skip(ignorar)
                .limit(limitar)
        },
        config: {
            validate: {
                query: {
                    ignorar: Joi.number().integer().min(0).default(0),
                    limitar: Joi.number().integer().min(1).default(10)
                }
            }
        }
    }
    ,
    {
        method: 'GET',
        path: '/projetos/{id}',
        handler: (request, response) => {
            Projetos.findOne({ _id: request.params.id },
                (err, doc) => {
                    if (err)
                        return response(Boom.wrap(err, 400, 'Erro ao buscar projeto'))

                    if (!doc)
                        return response(Boom.notFound())

                    response(doc)

                })
        },
        config: {
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        }
    }
    ,
    {
        method: 'POST',
        path: '/projetos',
        handler: async (request, response) => {
            const projeto = request.payload;
            if (!projeto.dtcriacao)
                projeto.dtcriacao = new Date();

            // const resultProjeto = await promisify(Projetos.save(projeto));
            // response(resultProjeto);
            Projetos.create(projeto, (err, doc) => {
                if (err)
                    return response(Boom.wrap(err, 400, 'Erro ao salvar projeto'));

                return response(doc)
            })
        }
    }
    ,
    {
        method: 'PATCH',
        path: '/projetos/{id}',
        handler: (request, response) => {
            Projetos.update({ _id: request.params.id },
                { $set: request.payload },
                (err, result) => {
                    if (err)
                        return response(Boom.wrap(err, 400, 'Erro ao salvar projeto'))

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
                    return reply(Boom.wrap(err, 400, 'Erro ao deletar projeto'));
                }

                if (result.n === 0) {
                    return reply(Boom.notFound());
                }

                response().code(204);
            });
        }
    }
]