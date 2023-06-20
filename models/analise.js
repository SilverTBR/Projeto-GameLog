const {Sequelize ,DataTypes} = require("sequelize")
const sequelize = require("../BD/mysql")
const { jogoModel } = require("./jogo");
const { usuarioModel } = require("./usuario")

const analiseModel = sequelize.define("Analise", {
    idJogo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    texto: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

analiseModel.belongsTo(jogoModel, {foreignKey: "idJogo"});

analiseModel.sync({force: false})

module.exports = {
    cadastrar: async function (id, texto){
        try{
            const resultado = await analiseModel.create({
                idJogo: id,
                texto: texto
            })
            console.log(resultado)
            if(!resultado.errors){
                return true
            }
            return {errors: "Cadastro de analise falhou"};
        }catch(error){
            console.error(error)
        }
    },
    buscarPorJogo: async function(id){
        try{
            const resultado = await analiseModel.findAll({where: {idJogo: id}})
            return resultado
        }catch(error){
            console.error(error)
            return error
        }
    },
    update: async function (id, texto){
        try{
            let numRowsAffected = await analiseModel.update({texto: texto}, {where: {id: id}})
            if(numRowsAffected[0]>0){
                return true
            }else{
                return {errors: "Não foi possivel dar update na analise"}
            }
        } catch(error) {
            console.error(error)
            return error;
        }
    },
    deletar: async function(id){
        try{
            let qntDeletados = await analiseModel.destroy({where:{id: id}})
            if(qntDeletados == 1){
                return true
            }else{
                return {errors: "Não foi possivel deletar a analise"}
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
