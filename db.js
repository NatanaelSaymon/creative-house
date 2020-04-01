const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./creative_house.db')

db.serialize(function(){
  // criar tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS ideias(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      alt TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT
    );
  `)

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
    "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    "Imagem de Curso de Programação",
    "Cursos de Programação",
    "Estudo",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    "https://rocketseat.com.br/"
  ]
  // db.run(query, values, function(err) {
  //   if(err) return console.log(err)

  //   console.log(this)
  // })
  // consultar dados na tabela
  db.all(`SELECT * FROM ideias`, function(err, rows){
    if(err) return console.log(err)
    console.log(rows)
  })
  //deletar dados na tabela
  db.run(`DELETE FROM ideias WHERE id= ?`, [1], function(err){
    if(err) return console.log(err)
    console.log("Deletado com sucesso!", this)
  })
})

modules.export = db