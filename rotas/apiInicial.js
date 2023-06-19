const express = require("express")
const mailer = require("../nodeMailer/mailer")
const usuario = require("../models/usuario")
var rotaAPI = express.Router();
//bettertoken

rotaAPI.post("/mailer", async (req, res) => {
    let {email, nome, mensagem, assunto} = req.body
    let resultado = await mailer.enviarEmail(email, nome, mensagem, assunto)
    res.json(resultado)
})

rotaAPI.post("/cadastrar", async (req, res) => {
    let {nome ,email, senha} = req.body
    let resultado = await usuario.cadastrar(nome, email, senha);
    res.json(resultado)
    
})

rotaAPI.post("/logar", async (req, res) => {
    let {email, senha} = req.body
    let resultado = await usuario.logar(email, senha);
    res.json(resultado)
})

module.exports = rotaAPI;