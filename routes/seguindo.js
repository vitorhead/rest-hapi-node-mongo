const Boom = require('boom')
const Seguindo = require('../models/Seguindo')
const Posts = require('../models/Posts')
const Joi = require('joi')

module.exports = [
    {
        method: 'POST',
        path: '/seguindo/{usuarioId}',
        handler: (request, response) => {
            /*
                inserir seguidor no ID informado

                payload esperado:
                    {
                        _id: ''
                    }
            */
            const { usuarioId } = request.params
            const seguir = request.payload

            Seguindo.findOneAndUpdate({ _id: usuarioId },
                {
                    $addToSet: { seguindo: seguir }
                },
                { upsert: true }, (error, doc) => {
                    if (error)
                        return response(Boom.wrap(error, 400, 'Erro ao seguir'))

                    response(doc)
                })

        }
    }
    ,
    {
        method: 'GET',
        path: '/seguindo/{id}/posts',
        handler: async (request, response) => {
            try {
                const { ignorar, limitar } = request.query
                const { id } = request.params
                // console.log('id', id)
                const seguindo = await Seguindo.find({ _id: id })
                // console.log('seguindo', seguindo)

                const timeline = await Posts.find({ 'usuario._id': { $in: seguindo } })
                    .skip(ignorar)
                    .limit(limitar)
                // console.log('timeline', timeline)
                response(timeline)
            }
            catch (error) {
                console.error(error)
                response(Boom.internal())
            }
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
]