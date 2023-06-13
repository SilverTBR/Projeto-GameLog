
let perfilService = {
    update: async function(id, nome, senha){
        const data = {
            method: "PUT",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({nome: nome, senha: senha})            
        }
        let resposta = await fetch("http://localhost:3000/API/"+id, data)
        return await resposta.json()
    },
    delete: async function(id){
        const data = {
            method: "DELETE",
            headers: {'Content-type': 'application/json'}           
        }
        let resposta = await fetch("http://localhost:3000/API/"+id, data)
        console.log(resposta)
        return await resposta.json()
    }
}
export default perfilService