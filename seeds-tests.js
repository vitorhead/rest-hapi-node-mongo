for (let i = 0; i < 2002; i++) {
    db.posts.insert({
        usuarioid : ObjectId("5be447d6a1fec04e189e52cd"),
        dtcriacao : new Date(),
        descricao : 'post numero '+i,
        qtcurtidas : Math.floor(Math.random() * 20) + 1
    })
}

for (let i = 0; i < 10; i++) {
    db.posts.insert({
        usuarioid : ObjectId("5be43fff790c465ec8028c37"),
        projetoid : ObjectId("5be4401a790c465ec8028c39"), 
        dtcriacao : new Date(),
        descricao : `post ${i} do projeto`,
        qtcurtidas : Math.floor(Math.random() * 20) + 1
    })
}