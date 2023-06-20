import analiseService from "../service/analiseService.js"

window.onload = () => {

    const getID = () => {
        return document.getElementById("id").value
    }

    const getAnalise = () => {
        return document.getElementById("analise").value
    }

    const validarCampos = () => {
        if(getID() != "" && getAnalise() != ""){
            return true
        }
        return false
    }

    const chamarExcluir = async () => {
        let resultado = await analiseService.deletar(getID(), sessionStorage.getItem("token"))
        if (!resultado.errors) {
            window.location.href = "/main?token=" + sessionStorage.getItem("token")
        } else {
            //Fiz dessa forma pois o erro que poderia dar é id invalida ou algo desse tipo e se tal erro ocorrer num é para estar ali, pelo menos acho
            sessionStorage.clear()
            window.location.href = "/?error=SemPermissao"
        }

    }

        const chamarEditar = async () => {
        if (validarCampos()) {
            let resultado = await analiseService.editar(getID(), getAnalise(), sessionStorage.getItem("token"))
            if (!resultado.errors) {
                window.location.href = "/main?token=" + sessionStorage.getItem("token")
            } else {
                document.getElementById("aviso").style.display = "flex"
            }
        } else {
            document.getElementById("aviso").style.display = "flex"
        }
    }

    document.getElementById("salvar").addEventListener("click", chamarEditar)
    document.getElementById("excluir").addEventListener("click", chamarExcluir)

}