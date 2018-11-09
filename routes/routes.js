const projetos = require('./projetos')
const usuarios = require('./usuarios')
const posts = require('./posts')
const seguidores = require('./seguidores')
const seguindo = require('./seguindo')

module.exports = [
    ...projetos,
    ...usuarios,
    ...posts,
    ...seguidores,
    ...seguindo
]