const express = require("express")
var inicial = express.Router();

inicial.get("/", (req, res) => {
    res.render("index")
})

inicial.get("/sobre", (req, res) => {
    res.render("sobre", req.session)
})

inicial.get("/cadastro", (req, res) => {
    res.render("cadastrar")
})


module.exports = inicial;