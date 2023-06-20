const {Sequelize ,DataTypes} = require("sequelize")
const sequelize = require("../BD/mysql")
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
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

jogoModel.belongsTo(usuarioModel, {foreignKey: "idUsuario"});

jogoModel.sync({force: false})

module.exports = {
    jogoModel,
    cadastrar: async function (dados, id){
        try{
            const resultado = await jogoModel.create({
                idUsuario: id,
                nome: dados.nome,
                desenvolvedora: dados.desenvolvedora,
                distribuidora: dados.distribuidora,
                genero: dados.genero,
                subgenero: dados.subgenero
            })
            if(resultado){
                return true
            }
            return {errors: "Cadastro de jogo falhou"};
        }catch(error){
            console.error(error)
        }
    },
    buscarPorUser: async function(id){
        try{
            //const resultado = await jogoModel.findAll({where: {id: id}, order:[order, "DESC"]})
            const resultado = await jogoModel.findAll({where: {idUsuario: id}})
            return resultado
        }catch(error){
            console.error(error)
            return error
        }
    },
    update: async function (id, dados){
        console.log(id)
        try{
            let numRowsAffected = await jogoModel.update({nome: dados.nome, desenvolvedora: dados.desenvolvedora, distribuidora: dados.distribuidora, genero:dados.genero, subgenero: dados.subgenero}, {where: {id: id}})
            if(numRowsAffected[0]>0){
                return true
            }else{
                return {errors: "Não foi possivel dar update no jogo"}
            }
        } catch(error) {
            console.error(error)
            return error;
        }
    },
    deletar: async function(id){
        try{
            let qntDeletados = await jogoModel.destroy({where:{id: id}})
            if(qntDeletados == 1){
                return true
            }else{
                return {errors: "Não foi possivel deletar o jogo"}
            }
        }catch(error){
            console.error(error)
            return error;
        }
    },

    //depois ver sobre uma forma de evitar com que ao colocar um id não cadastrado ele mesmo assim funciona 
    deletarTodos: async function(idUsuario){
        try{
            let qntDeletados = await jogoModel.destroy({where:{idUsuario: idUsuario}})
            if(qntDeletados >= 0){
                return true
            }else{
                return {errors: "Não foi possivel deletar todos os jogo"}
            }
        }catch(error){
            console.log(error)
            return error
        }
    },

}
