import perfilService from "../service/perfilService.js"
let alterouSenha = false;
window.onload = () => {

    const getNome = () => {
        return document.getElementById("nome").value
    }

    const getSenha = () => {
        return document.getElementById("senha").value
    }

    const getcSenha = () => {
        if(alterouSenha){
            return document.getElementById("cSenha").value
        }
        return document.getElementById("senha").value
    }

    const getID = () => {
        return document.getElementById("id").value
    }

    const validarSenha = () => {
        if (getSenha() === getcSenha()) {
            return true
        }
        return false;
    }

    const validarCampos = () => {
        if (getNome().trim() != "" && getSenha().trim() != "") {
            return true
        }
        return false
    }

    const definirAviso = (error) => {
        if (error.errors == "0editar") {
            document.getElementById("aviso-text").innerHTML = "Não foi possivel editar!"
        }
        else if(error.errors == "ImpossivelEditar"){
            document.getElementById("aviso-text").innerHTML = "Impossivel editar usuario!"
        }
        document.getElementById("aviso").style.display = "flex"
    }

    const chamarUpdate = async () => {
        if (validarCampos() && validarSenha()) {
            let resultado = await perfilService.update(getID(), getNome(), getSenha(), sessionStorage.getItem("token"));
            if (resultado.errors) {
                definirAviso(resultado)
            } else {
                sessionStorage.setItem("token", resultado);
                window.location.href = "http://localhost:3000/main/perfil?token="+resultado;
            }
        } else {
            document.getElementById("aviso").style.display = "flex"
        }
    }

    const chamarDelete = async () => {
        let resultado = await perfilService.delete(getID(), sessionStorage.getItem("token"));
        if (!resultado.erros) {
            if (resultado) {
                sessionStorage.clear()
                window.location.href = "http://localhost:3000/"
            } 
        }else{
            definirAviso(resultado)
        }

    }

    const habilitarSenha = () => {
        alterouSenha = true;
        const cSenha = document.getElementById("cSenha")
        cSenha.removeAttribute("disabled")
        cSenha.classList.remove("disabled-input")
    }

    document.getElementById("senha").addEventListener("input", habilitarSenha)
    document.getElementById("salvar").addEventListener("click", chamarUpdate)
    document.getElementById("excluir").addEventListener("click", chamarDelete)

}