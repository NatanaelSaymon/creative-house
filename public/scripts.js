function onOff(){
    document.querySelector("#modal").classList.toggle("hide")
    
    document.querySelector("body").classList.toggle("hideScroll")
    
    document.querySelector("#modal").classList.toggle("addScroll")
}

function checkFields(event){
    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]

    const isEmpty = valuesToCheck.find(function(value){
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if(checkIfIsString && checkIfIsEmpty){
            return true
        }
    })

    if(isEmpty){
        event.preventDefault()
        alert("Por favor, preencha todos os campos.")
    }
}

        
/**
 * EM JAVASCRIPT TUDO É OBJETO!
 * 
 * document = documento HTML
 * querySelector = pesquisa de um seletor
 * addEventListener = ouvidor de eventos
 * function(){}  = função anonima
 * document.querySelector("#footer") = estamos procurando pelo id footer
 * classList = Lista de classes
 * toggle = adicionar ou remover
 */