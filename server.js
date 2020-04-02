// Usando express para criar e configurar meu servidor
const express = require('express')
const server = express()

// Configurando o nunjucks
const nunjucks = require('nunjucks')

// Banco de dados
const db = require('./db')

// Habilitando o uso do ==> req.body <==
server.use(express.urlencoded({ extended: true }))

// Configurando arquivos estaticos(css, scripts, imagens)
server.use(express.static('public'))

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
})

// Criando rota e capturando o pedido do cliente para responder
server.get("/", function(req, res){
  db.all(`SELECT * FROM ideias`, function(err, rows){
    if(err) {
      console.log(err)
      return res.send("Erro no banco de dados, tente novamente!")
    }
    
    const reversedIdeias = [...rows].reverse()

    let UltimasIdeias = []
    for(let ideia of reversedIdeias){
      if(UltimasIdeias.length < 3){
        UltimasIdeias.push(ideia) //push = adicionar
      }
    }
    return res.render('index.html', { ideias: UltimasIdeias })
  })
  
})

server.get("/ideias", function(req, res){
  db.all(`SELECT * FROM ideias`, function(err, rows){
    if(err) {
      console.log(err)
      return res.send("Erro no banco de dados, tente novamente!")
    }
    const reversedIdeias = [...rows].reverse()
    return res.render('ideias.html', { ideias: reversedIdeias})
  })
})

server.post("/", function(req, res){
  
  // INSERINDO OS DADOS NA TABELA
  const query = `
    INSERT INTO ideias(
      image,
      title,
      category,
      description,
      link
    ) VALUES(?,?,?,?,?);
  `
  const values = [
    req.body.image,
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
    
    return res.redirect("/ideias") //redirecionando para pagina ideias
  })

  console.log(req.body)
})

// Habilitando o servidor na porta 5000 
server.listen(5000, function(){
  console.log(" ==> Server is runnign <== ")
})