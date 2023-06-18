const {Sequelize ,DataTypes} = require("sequelize")
const sequelize = require("../BD/mysql")
const jwt = require("jsonwebtoken");
const { usuarioModel } = require("./usuario");

const jogoModel = sequelize.define("Jogo", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desenvolvedora: {
        type: DataTypes.STRING,
        allowNull: false
    },
    distribuidora: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subgenero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    situacao: {
        type: DataTypes.SMALLINT,
        allowNull: false
    }
})

jogoModel.belongsTo(usuarioModel, {foreignKey: "idUsuario"});

jogoModel.sync({force: false})

module.exports = {
    cadastrar: async function (dados, id){
        try{
            const resultado = await jogoModel.create({
                idUsuario: id,
                nome: dados.nome,
                desenvolvedora: dados.desenvolvedora,
                distribuidora: dados.distribuidora,
                genero: dados.genero,
                subgenero: dados.subgenero,
                situacao: 1
            })
            if(resultado){
                return true
            }
            return false;
        }catch(error){
            return false;
        }
    },
    buscarPorUser: async function(id){
        try{
            //const resultado = await jogoModel.findAll({where: {id: id}, order:[order, "DESC"]})
            console.log(id)
            const resultado = await jogoModel.findAll({where: {idUsuario: id}})
            return resultado
        }catch(error){
            console.error(error)
            return null
        }
    }
}
