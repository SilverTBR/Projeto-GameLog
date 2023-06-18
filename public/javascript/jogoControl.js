import jogoService from "./jogoService.js"

window.onload = () => {
    const getNome = () => {
        return document.getElementById("nome").value
    }

    const getGenero = () => {
        return document.getElementById("genero").value
    }

    const getSubgenero = () => {
        return document.getElementById("subgenero").value
    }

    const getDesenvolvedora = () => {
        return document.getElementById("desenvolvedora").value
    }

    const getDistribuidora = () => {
        return document.getElementById("distribuidora").value
    }

    const getID = () => {
        return document.getElementById("id").value
    }

    const verificarCampos = () => {
        if(getNome() != "" && getGenero() != "" && getSubgenero() != "" && getDesenvolvedora() != "" && getDistribuidora != ""){
            return true
       }
       return false;
    }

    const buttonSucesso = () => {
        document.getElementById("cadastrar").style.backgroundColor = "#d4edda"
        document.getElementById("cadastrar").style.borderColor = "#c3e6cb"
        document.getElementById("cadastrar").style.color = "#155724"
        document.getElementById("cadastrar").style.cursor = "default"
        document.getElementById("cadastrar").innerHTML = '<i class="fa-solid fa-check"></i>' 
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("aviso").style.display = "none"
    }

    const chamarCadastro = async () => {
        if(verificarCampos()){
            let resultado = await jogoService.cadastrar(getID(), getNome(), getDesenvolvedora(), getDistribuidora(), getGenero(), getSubgenero(), sessionStorage.getItem("token"));
            console.log(resultado)
            if(resultado){
                buttonSucesso()
            }else{
                document.getElementById("aviso").style.display = "flex"
            }
        }else{
            document.getElementById("aviso").style.display = "flex"
        }
    }

    document.getElementById("cadastrar").addEventListener("click", chamarCadastro)

}