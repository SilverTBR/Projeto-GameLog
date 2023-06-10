const express = require("express")
const mailer = require("../nodeMailer/mailer")
var rotaAPI = express.Router();

rotaAPI.post("/mailer", async (req, res) => {
    let {email, nome, mensagem, assunto} = req.body
    let resultado = await mailer.enviarEmail(email, nome, mensagem, assunto)
    res.json(resultado)
})

module.exports = rotaAPI;