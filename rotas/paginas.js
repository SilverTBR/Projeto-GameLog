const express = require("express")
var inicial = express.Router();

inicial.get("/", (req, res) => {
    res.render("index")
})

inicial.get("/sobre", (req, res) => {
    res.render("sobre", {token: req.query.token})
})

inicial.get("/cadastro", (req, res) => {
    res.render("cadastrar")
})


module.exports = inicial;