'use strict';

const Hapi = require('hapi')
const MongoJS = require('mongojs')
const routes = require('./routes/routes.js')

const server = new Hapi.Server();
server.connection({
    host : 'localhost',
    port : 8081
});

server.app.db = MongoJS('hapi-rest-mongo', ['projetos'])

server.route(routes);

server.start(err => {
    if (err)
        throw err;

    console.log(`Servidor rodando em ${server.info.uri}`)
})

// server.register(
//     routes, 
//     (err) => {
//     if (err) throw err;

//     server.start(err => {    
//         console.log(`Servidor rodando em ${server.info.uri}`)
//     })
// })