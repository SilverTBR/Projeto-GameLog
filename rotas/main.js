const express = require("express")
var main = express.Router();


main.get("/", (req, res) => {
    res.render("main", {usuario: req.usuario})
})

main.get("/perfil", (req, res) => {
    res.render("perfil", {usuario: req.usuario})
})


module.exports = main;