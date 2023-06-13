import perfilService from "./perfilService.js"

window.onload = () => {

    const getEmail = () => {
        return document.getElementById("email").value
    }

    const getNome = () => {
        return document.getElementById("nome").value
    }

    const getSenha = () => {
        return document.getElementById("senha").value
    }

    const getcSenha = () => {
        return document.getElementById("cSenha").value
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
        document.getElementById("aviso").style.display = "flex"
    }

    const chamarUpdate = async () => {
        if (validarCampos() && validarSenha()) {
            let resultado = await perfilService.update(getID(), getNome(), getSenha());
            if (resultado.errors) {
                definirAviso(resultado)
            } else {
                sessionStorage.setItem("token", resultado);
                window.location.href = "http://localhost:3000/main/perfil";
            }
        } else {
            document.getElementById("aviso").style.display = "flex"
        }
    }

    const chamarDelete = async () => {
        let resultado = await perfilService.delete(getID());
        if (!resultado.erros) {
            if (resultado) {
                window.location.href = "http://localhost:3000/"
            } else {
                document.getElementById("aviso").style.display = "flex"
            }
        }else{
            definirAviso(resultado)
        }

    }

    const habilitarSenha = () => {
        const cSenha = document.getElementById("cSenha")
        cSenha.removeAttribute("disabled")
        cSenha.classList.remove("disabled-input")
    }

    document.getElementById("senha").addEventListener("input", habilitarSenha)
    document.getElementById("salvar").addEventListener("click", chamarUpdate)
    document.getElementById("excluir").addEventListener("click", chamarDelete)

}