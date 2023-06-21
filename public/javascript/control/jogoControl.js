import jogoService from "../service/jogoService.js"

window.onload = () => {
    if(!sessionStorage.getItem("token")){
        window.location.href = "/?error=SemPermissao";
    }
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    document.getElementById("perfil").innerHTML += usuario.nome

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

    const verificarCampos = () => {
        if(getNome() != "" && getGenero() != "" && getSubgenero() != "" && getDesenvolvedora() != "" && getDistribuidora() != ""){
            return true
       }
       return false;
    }
    
    const chamarCadastro = async () => {
        if(verificarCampos()){
            let resultado = await jogoService.cadastrar(usuario.id, getNome(), getDesenvolvedora(), getDistribuidora(), getGenero(), getSubgenero(), sessionStorage.getItem("token"));
            if(!resultado.errors){
                window.location.href = "/main";
            }else{
                document.getElementById("aviso").style.display = "flex"
            }
        }else{
            document.getElementById("aviso").style.display = "flex"
        }
    }



    document.getElementById("cadastrar").addEventListener("click", chamarCadastro)

}