const express = require("express")
const path = require('path');
const app = express();
require("dotenv").config()

var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "view"));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "mustache");

const rotaPaginas = require("./rotas/paginas")
const rotaAPI = require("./rotas/api")

app.use("/", rotaPaginas);
app.use("/API", rotaAPI);


    //mailer.enviarEmail()

// app.get("/sobre#teste", (req, res) => {
//     res.render("/sobre", {scrollTo: "teste"})
// })





app.listen(3000, () => {
    console.log("Rodando...");
})