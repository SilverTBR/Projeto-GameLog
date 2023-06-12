const Sequelize = require("sequelize")

const sequelize = new Sequelize("web2","root","1234", {host: "localhost", dialect: "mysql"})

sequelize.authenticate()
    .then(() => console.log("Conectado ao MySQL"))
    .catch(error => console.log("Erro ao conectar no BD: "+ error))

module.exports = sequelize