module.exports = (app)=>{
    //importar a configuração do database
    var conexao = require('../config/database')

    //executar a conexao
    conexao()

    //importar modelo metas
    var metas = require('../models/metas')

    //abrir formulário
    app.get('/metas',async(req,res)=>{
        var resultado = await metas.find()
        res.render('metas.ejs',{dados:resultado})
        //console.log(resultado)
    })

    //gravar as informações do formulário no banco de dados
    app.post('/metas',(req,res)=>{
        var documento = new metas({
            titulo:req.body.titulo,
            texto:req.body.texto
        }).save()
        .then(()=>{res.redirect('/metas')})
        .catch(()=>{res.send('Não foi possível gravar')})   
    })
}