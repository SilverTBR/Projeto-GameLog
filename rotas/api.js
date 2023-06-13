const express = require("express")
const usuario = require("../models/usuario")
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
        res.json(resultado)
    }
    if(resultado){
        req.session.destroy();
    }
    res.json(resultado)
})



module.exports = rotaAPI;