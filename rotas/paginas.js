const express = require("express")
var rotaPaginas = express.Router();
const jwt = require('jsonwebtoken')


let controlaAcesso = function (req, res, next) {
    let token = req.query.token;
    jwt.verify(token, process.env.jwtChave, (err, decoded) => {
      if (err) {
        res.redirect("/?error=SemPermissao")
      } else {
        req.usuario = decoded.usuario
        return next()
      }
    })
  }

rotaPaginas.get("/", (req, res) => {
    res.render("index")
})

rotaPaginas.get("/sobre", (req, res) => {
    res.render("sobre")
})

rotaPaginas.get("/cadastro", (req, res) => {
    res.render("cadastrar")
})

rotaPaginas.get("/main", controlaAcesso, (req, res) => {
    res.render("main", {usuario: req.usuario, token: req.query.token})
})

module.exports = rotaPaginas;