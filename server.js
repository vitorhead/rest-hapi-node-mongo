'use strict';

const Hapi = require('hapi')
const MongoJS = require('mongojs')

const server = new Hapi.Server();
server.connection({
    host : 'localhost',
    port : 8081
});

server.app.db = MongoJS('hapi-rest-mongo', ['projetos'])

server.register([
    require('./routes/projetos')
], (err) => {
    if (err) throw err;

    server.start(err => {    
        console.log(`Servidor rodando em ${server.info.uri}`)
    })
})