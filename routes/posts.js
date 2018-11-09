const Boom = require('boom')
const Posts = require('../models/Posts')
const Joi = require('joi')
const { promisify } = require('util')

module.exports = [
    {
        method: 'GET',
        path: '/posts',
        handler: (request, response) => {
            const { ignorar, limitar } = request.query
            Posts.find((err, docs) => {
                if (err)
                    return response(Boom.wrap(err, 400, 'Erro ao buscar postagens'))

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
        path: '/posts/{id}',
        handler: (request, response) => {
            Posts.findOne({ _id: request.params.id },
                (err, doc) => {
                    if (err)
                        return response(Boom.wrap(err, 400, 'Erro ao buscar postagem'))

                    if (!doc)
                        return response(Boom.notFound())

                    response(doc)

                })
        }
    }
    ,
    {
        method: 'GET',
        path: '/posts/usuario/{usuarioid}',
        handler: (request, response) => {
            Posts.find({ usuarioid: request.params.usuarioid },
                (err, doc) => {
                    if (err)
                        return response(Boom.wrap(err, 400, 'Erro ao buscar postagens do usuário'))

                    if (!doc)
                        return response(Boom.notFound())

                    response(doc)
                })
                .sort({ dtcriacao: 'desc' })
                .limit(20)
        }
    }
    ,
    {
        method: 'GET',
        path: '/posts/projeto/{projetoid}',
        handler: (request, response) => {
            Posts.find({ projetoid: request.params.projetoid },
                (err, doc) => {
                    if (err)
                        return response(Boom.wrap(err, 400, 'Erro ao buscar postagens do projeto'))

                    if (!doc)
                        return response(Boom.notFound())

                    response(doc)
                })
                .sort({ dtcriacao: 'desc' })
                .limit(20)
        }
    }
    ,
    {
        method: 'POST',
        path: '/posts',
        handler: async (request, response) => {
            const post = request.payload;
            if (!post.dtcriacao)
                post.dtcriacao = new Date();

            Posts.create(post, (err, doc) => {
                if (err)
                    return response(Boom.wrap(err, 400, 'Erro ao inserir postagem'));

                return response(doc)
            })
        }
    }
    ,
    {
        method: 'PATCH',
        path: '/posts/{id}',
        handler: (request, response) => {
            Posts.update({ _id: request.params.id },
                { $set: request.payload },
                (err, result) => {
                    if (err)
                        return response(Boom.wrap(err, 400, 'Erro ao salvar postagem'))

                    if (result.n === 0)
                        return response(Boom.notFound())

                    response().code(204);
                })
        }
    }
    ,
    {
        method: 'DELETE',
        path: '/posts/{id}',
        handler: (request, response) => {

            Posts.remove({
                _id: request.params.id
            }, (err, result) => {

                if (err) {
                    return reply(Boom.wrap(err, 400, 'Erro ao deletar post'));
                }

                if (result.n === 0) {
                    return reply(Boom.notFound());
                }

                response().code(204);
            });
        }
    }
]