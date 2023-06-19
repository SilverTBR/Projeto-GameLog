const express = require("express")
var main = express.Router();


main.get("/", (req, res) => {
    res.render("main", {usuario: req.usuario, token: req.query.token})
})

main.get("/perfil", (req, res) => {
    res.render("perfil", {usuario: req.usuario, token: req.query.token})
})

main.get("/jogos", (req, res) => {
    let jogo = null
    if(req.query.jogo){
        jogo = JSON.parse(req.query.jogo) 
    }
    res.render("jogos", {usuario: req.usuario, jogo: jogo, token: req.query.token})
})

main.get("/analise", (req, res) => {
    res.render("analise", {usuario: req.usuario, token: req.query.token})
})


module.exports = main;