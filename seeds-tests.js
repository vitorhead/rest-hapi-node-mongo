
/*

    TODO
        curtir projetos
        projetos mais curtidos globalmente
        area do usuario (arq e urbanismo)

        se o usuario mudar o nome, tem q dar update nos projetos e posts q tem o usuario tb

*/


const Mongoose = require('mongoose');
const Usuarios = require('./models/Usuarios')
const Projetos = require('./models/Projetos')
const Posts = require('./models/Posts')

Mongoose.connect('mongodb://localhost:27017/hapijsmongo', { useNewUrlParser: true });
const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão'));
db.once('open', async function callback() {
    console.log('Conexão com o banco de dados ativa - seeds tests');
    // await Usuarios.remove({}, (err, succ) => console.log(succ))
    // await Projetos.remove({}, (err, succ) => console.log(succ))
    // await Posts.remove({}, (err, succ) => console.log(succ))
    await this.dropDatabase();
    console.log('removidos, chamado setup')
    setupInc()
});


async function setup() {
    // o id vem no insert
    let odin = {
        name: "odin",
        email: "odin@asgard.com",
        photo: 'vazio',
        password: "oi123456",
        // following : [],
        // followers : [{
        //     name : 'thor',
        //     photo : 'qwerqwerq'
        // }]
    }

    let ash = {
        name: "ash ketchum",
        email: "ash@pallet.com",
        photo: 'vazio',
        password: "oi123456",
        // following : [{
        //     name : 'Professor Carvalho',
        //     photo : 'https://vignette.wikia.nocookie.net/pokemon/images/8/84/Professor_Oak_XY.png/revision/latest?cb=20131221014829'
        // }],
        // followers : []
    }

    const createdOdin = await Usuarios.create(odin);
    odin._id = createdOdin._id;
    const createdAsh = await Usuarios.create(ash);
    ash._id = createdAsh._id;

    //varios posts pro odin
    for (let i = 0; i < 2002; i++) {
        Posts.create({
            usuarioid: odin._id,
            dtcriacao: new Date(),
            descricao: 'post numero ' + i,
            qtcurtidas: Math.floor(Math.random() * 20) + 1
        })
    }

    //cria um projeto pro ash
    const createdProjectAsh = await Projetos.create({
        nome: "zerar tudo",
        dtcriacao: new Date(),
        usuarioid: ash._id,
        progresso: 0,
        qtcurtidas: 10000
    })


    //add 10 posts no projeto do ash
    for (let i = 0; i < 10; i++) {
        Posts.create({
            usuarioid: ash._id,
            projetoid: createdProjectAsh._id,
            dtcriacao: new Date(),
            descricao: `post ${i} do projeto do ash`,
            qtcurtidas: Math.floor(Math.random() * 20) + 1,
            comentarios: [{
                usuario: {
                    name: odin.name,
                    photo: odin.photo,
                    _id: odin._id
                },
                texto: 'fala meu parça'
            }]
        })
    }
}

async function setupInc() {
    console.time('setupInc')
    const sample = []
    for (let i = 0; i < 1000; i++) {
        const userInc = {
            name: "usuario inc " + i,
            email: "usuario" + i + "@asgard.com",
            photo: 'vazio',
            password: "oi123456",
            // following : [],
            // followers : [{
            //     name : 'thor',
            //     photo : 'qwerqwerq'
            // }]
        }
        const resultUser = await Usuarios.create(userInc)
        userInc._id = resultUser._id


        const projInc = {
            nome: "projeto inc " + i,
            dtcriacao: new Date(),
            usuarioid: userInc._id,
            progresso: 0,
            qtcurtidas: Math.floor(Math.random() * 100000) + 1
        }
        const resultProj = await Projetos.create(projInc)
        projInc._id = resultProj._id

        const samplePosts = []
        for (let y = 0; y < 10; y++) {
            const postInc = {
                usuarioid: userInc._id,
                projetoid: projInc._id,
                dtcriacao: new Date(),
                descricao: `olha o post aee ${i + y}`,
                qtcurtidas: Math.floor(Math.random() * 20) + 1,
                comentarios: []
            }
            const resultPost = await Posts.create(postInc)
            postInc._id = resultPost._id

            samplePosts.push(postInc)
        }

        sample.push({ usuario: userInc, projeto: projInc, posts: samplePosts })
    }
    console.timeEnd('setupInc')
}