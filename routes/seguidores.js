const Boom = require('boom')
const Seguidores = require('../models/Seguidores')

module.exports = [
    {
        method: 'POST',
        path: '/seguidores/{usuarioId}',
        handler: (request, response) => {
            /*
                inserir seguidor no ID informado

                payload esperado:
                    'id do seguidor'
            */
            const { usuarioId } = request.params
            const seguidor = request.payload

            Seguidores.findOneAndUpdate({ _id: usuarioId },
                {
                    $addToSet: { seguidores: seguidor }
                },
                { upsert: true }, (error, doc) => {
                    if (error)
                        return response(Boom.wrap(error, 400, 'Erro ao adicionar seguidor'))

                    response(doc)
                })

        }
    }
]