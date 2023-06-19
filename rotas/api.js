const express = require("express")
const usuario = require("../models/usuario")
const jogos = require("../models/jogo")
var rotaAPI = express.Router();

//Editar usuario
rotaAPI.put("/:id", async (req, res) => {
    let { id } = req.params
    let { nome, senha } = req.body
    let dados = { nome, senha }
    let concluido = await usuario.update(id, dados)
    if (!concluido.errors) {
        let resultado = await usuario.buscarPorPk(id)
        if (!resultado.errors) {
            req.session.token = resultado
        }
        res.json(resultado)
    } else {
        res.json(concluido)
    }
})

//deletar usuario
rotaAPI.delete("/:id", async (req, res) => {
    let { id } = req.params
    let resultado = await usuario.deletar(id)
    res.json(resultado)
})

//cadastrar jogo
rotaAPI.post("/jogo/:id", async (req, res) => {
    let { id } = req.params
    let resultado = await jogos.cadastrar(req.body, id)
    res.json(resultado)
})

//buscar por jogo pelo id
rotaAPI.get("/:id", async (req, res) => {
    let { id } = req.params
    let resultado = await jogos.buscarPorUser(id)
    if (resultado == null) {
        res.render("/?error=SemPermissao")
    }
    res.json(resultado)
})

//deletar jogo por id
rotaAPI.delete("/jogo/:id", async (req, res) => {
    let { id } = req.params
    let resultado = await jogos.deletar(id)
        console.log(resultado)
        res.json(resultado)

})

//Deletar todos os jogos pelo id do usuario
rotaAPI.delete("/jogo/all/:id", async (req, res) => {
    let { id } = req.params
    let resultado = await jogos.deletarTodos(id)
    console.log(resultado)
    res.json(resultado)

})

//Editar jogos pelo id do jogo
rotaAPI.put("/jogo/:id", async (req, res) => {
    let { id } = req.params
    let { nome, desenvolvedora, distribuidora, genero, subgenero } = req.body
    let dados = { nome, desenvolvedora, distribuidora, genero, subgenero }
    let concluido = await jogos.update(id, dados)
    if (concluido) {
        res.json(concluido)
    } else {
        resultado = { errors: "Não foi possivel editar" }
        res.json(resultado)
    }
})



module.exports = rotaAPI;