const express = require("express")
const usuario = require("../models/usuario")
const jogos = require("../models/jogo")
var rotaAPI = express.Router();

rotaAPI.put("/:id", async (req, res) => {
    let {id} = req.params
    let {nome, senha} = req.body
    let dados = {nome, senha}
    let concluido = await usuario.update(id, dados)
    if(concluido){
        let resultado = await usuario.buscarPorPk(id)
        if(!resultado.errors){
            req.session.token = resultado
        }
        res.json(resultado)
    }else{
        resultado = {errors: "Não foi possivel editar"}
        res.json(resultado)
    }
})

rotaAPI.delete("/:id", async (req, res) => {
    let {id} = req.params
    let resultado = await usuario.deletar(id)
    if(resultado.errors){
        console.log(resultado)
        req.session.destroy();
        res.render("/?error=SemPermissao")
    }
    if(resultado){
        req.session.destroy();
    }
    res.json(resultado)
})

rotaAPI.post("/jogo/:id", async (req, res) => {
    let {id} = req.params
    let resultado = await jogos.cadastrar(req.body, id)
    res.json(resultado)
})

rotaAPI.get("/:id", async (req, res)=> {
    let {id} = req.params
    let resultado = await jogos.buscarPorUser(id)
    console.log(resultado)
    if(resultado == null){
        res.render("/?error=SemPermissao")
    }
    res.json(resultado)
})



module.exports = rotaAPI;