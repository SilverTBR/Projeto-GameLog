const express = require("express")
const path = require('path');
const session = require("express-session")
const jwt = require('jsonwebtoken')
var mustacheExpress = require("mustache-express");

const app = express();
var engine = mustacheExpress();

require("dotenv").config()
app.engine("mustache", engine);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "view"));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "mustache");

const inicial = require("./rotas/paginas")
const apiI = require("./rotas/apiInicial")
const main = require("./rotas/main")
const API = require("./rotas/api")

app.use(session({
  secret:process.env.sessionChave,
  resave: false,
  saveUninitialized: false
}))


let controlaAcesso = function (req, res, next) {
    let token = null
    if(req.query.token){
      token = req.query.token
    }else{
      token = req.headers.authorization?.split(' ')[1];
    }
    jwt.verify(token, process.env.jwtChave, (err, decoded) => {
      if (err) {
        res.redirect("/?error=SemPermissao")
      } else {
        req.usuario = decoded.usuario
        return next()
      }
    })
  }


app.use("/", inicial);
app.use("/acesso", apiI);
app.use("/main", controlaAcesso, main);
app.use("/API", controlaAcesso, API)





app.listen(3000, () => {
    console.log("Rodando...");
})