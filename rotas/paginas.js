const express = require("express")
var rotaPaginas = express.Router();

rotaPaginas.get("/", (req, res) => {
    res.render("index")
})

rotaPaginas.get("/sobre", (req, res) => {
    res.render("sobre")
})

module.exports = rotaPaginas;