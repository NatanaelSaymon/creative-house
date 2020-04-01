//usando express para criar e configurar meu servidor
const express = require('express')
const server = express()

//Banco de dados
const db = require('./db')

//Habilitando o uso do req.body
server.use(express.urlencoded({extended: true}))

//Configurando arquivos estaticos(css, scripts, imagens)
server.use(express.static('public'))

//Configurando o nunjucks
const nunjucks = require('nunjucks')

const ideias = require('./data')

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
})

//criando rota e capturando o pedido do cliente para responder
server.get("/", function(req,res){

  const IdeiasIndex = []

  for(let ideia of ideias){
    if(IdeiasIndex.length < 3){
      IdeiasIndex.push(ideia) //push = adicionar
    }
  }
  return res.render('index.html', { ideias: IdeiasIndex })
})

server.get("/ideias", function(req,res){
  return res.render('ideias.html', { ideias })
})

//ligando o servidor na porta 5000 
server.listen(5000, function(){
  console.log("==> Server is runnign <==")
})

server.post("/", function(req, res){
  // inserir dados na tebal
  const query = `
  INSERT INTO ideias(
    image,
    alt,
    title,
    category,
    description,
    link
  ) VALUES(?,?,?,?,?,?);
  `
  const values = [
    req.body.image,
    req.body.alt,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link
  ]
  db.run(query, values, function(err) {
    if(err) {
      console.log(err)
      return res.send("Erro no banco de dados, tente novamente!")
    }
    return res.redirect("/ideias")
  })
})