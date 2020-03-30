//usando express para criar e configurar meu servidor
const express = require('express')
const server = express()

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