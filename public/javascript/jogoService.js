let jogoService = {
    cadastrar: async function(id, nome, desenvolvedora, distribuidora, genero, subgenero, token){
        const data = {
            method: "POST",
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "+token},
            body: JSON.stringify({nome: nome, desenvolvedora: desenvolvedora, distribuidora: distribuidora, genero: genero, subgenero: subgenero})            
        }
        let resposta = await fetch("http://localhost:3000/API/jogo/"+id, data)
        return await resposta.json()
    },

    buscaPorUser: async function(id, token){
        const data = {
            headers: {'Content-type': 'application/json',
            "Authorization": "Bearer "+token},
        }
        let resposta = await fetch("http://localhost:3000/API/"+id, data)
        return await resposta.json()
    }
}
export default jogoService