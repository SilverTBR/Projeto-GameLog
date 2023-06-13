const {Sequelize ,DataTypes} = require("sequelize")
const sequelize = require("../BD/mysql")
const jwt = require("jsonwebtoken");

const usuarioModel = sequelize.define("Usuario", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

usuarioModel.sync({force: false})



module.exports = {
    cadastrar: async function (nome, email, senha) {
        try{
        const resultado = await usuarioModel.create({
            nome: nome,
            email: email,
            senha: senha
        })
        const token = jwt.sign({usuario:resultado.dataValues}, process.env.jwtChave, {
            expiresIn: "1h"
        })
        return token
        }catch(error){
            return error
        }
    },

    logar: async function(email, senha){
        try{
        const resultado = await usuarioModel.findOne({where: {email: email, senha: senha}})
        //console.log(resultado.dataValues)
        if(resultado === null){
            return {errors: "Resultado não foi obtido"}
        }
        const token = jwt.sign({usuario:resultado.dataValues}, process.env.jwtChave, {
            expiresIn: "1h"
        })
        return token
        }catch(error){
            return error
        }
    },

    update: async function (id, dados) {
        try{
            let numRowsAffected = await usuarioModel.update({nome: dados.nome, senha: dados.senha}, {where: {id: id}})
            if(numRowsAffected[0]>0){
                return true
            }else{
                return false;
            }
        } catch(error) {
            return error
        }
    },

    buscarPorPk: async function(id) {
        try{
            const resultado = await usuarioModel.findOne({where: {id: id}})
            if(resultado === null){
                return {errors: "Resultado não foi obtido"}
            }
            const token = jwt.sign({usuario:resultado.dataValues}, process.env.jwtChave, {
                expiresIn: "1h"
            })
            return token
            }catch(error){
                return error
            }
    },

    deletar: async function(id){
        try{
            let qntDeletados = await usuarioModel.destroy({where:{id: id}})
            if(qntDeletados == 1){
                return true
            }else{
                return {errors: "Não foi possivel deletar"}
            }
        }catch(err){
            return error
        }
    }


}