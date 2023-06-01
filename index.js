const express = require("express")
const path = require('path');
const app = express();

var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);


app.set("views", path.join(__dirname, "view"));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "mustache");

app.get("/", (req, res) => {
    res.render("index")
})


app.listen(3000, () => {
    console.log("Rodando...");
})