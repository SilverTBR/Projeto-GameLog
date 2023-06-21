import jogoService from "../service/jogoService.js"
import analiseService from "../service/analiseService.js"


window.onload = () => {
    if(!sessionStorage.getItem("token")){
        window.location.href = "/?error=SemPermissao";
    }
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    document.getElementById("perfil").innerHTML += usuario.nome

    const mainGrid = document.getElementById("grid");
    const camposInput = document.querySelectorAll('.disabled-input');
    let valorCampos = []
    let listaAnalise = []


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
        if (getNome() != "" && getGenero() != "" && getSubgenero() != "" && getDesenvolvedora() != "" && getDistribuidora != "") {
            return true
        }
        return false;
    }

    function alternarEdicao() {
        const btnEditar = document.getElementById('editar');
        const btnSalvar = document.getElementById('salvar');
        const btnExcluir = document.getElementById('excluir');
        const btnCancelar = document.getElementById('cancelar');

        if (camposInput[0].disabled) {
            // Modo de edição
            camposInput.forEach(input => {
                input.removeAttribute('disabled');
                input.classList.remove('disabled-input');
                valorCampos.push(input.value)
            });
            btnEditar.style.display = 'none';
            btnSalvar.style.display = 'block';
            btnExcluir.style.display = 'block';
            btnCancelar.style.display = 'block';
        } else {
            // Modo de visualização
            camposInput.forEach((input, index) => {
                input.setAttribute('disabled', 'disabled');
                input.classList.add('disabled-input');
                input.value = valorCampos[index] || ''; // Define o valor do input a partir da array valorCampos
            });
            btnEditar.style.display = 'block';
            btnSalvar.style.display = 'none';
            btnExcluir.style.display = 'none';
            btnCancelar.style.display = 'none';
        }
    }


    const chamarEditar = async () => {
        if (verificarCampos()) {
            let resultado = await jogoService.editar(getID(), getNome(), getDesenvolvedora(), getDistribuidora(), getGenero(), getSubgenero(), sessionStorage.getItem("token"));
            if (!resultado.errors) {
                window.location.href = "/main"
            } else {
                document.getElementById("aviso").style.display = "flex"
            }
        } else {
            document.getElementById("aviso").style.display = "flex"
        }
    }

    const chamarDel = async () => {
        let resultado = await jogoService.deletar(getID(), sessionStorage.getItem("token"))
        if (!resultado.errors) {
            window.location.href = "/main"
        } else {
            //Fiz dessa forma pois o erro que poderia dar é id invalida ou algo desse tipo e se tal erro ocorrer num é para estar ali, pelo menos acho
            sessionStorage.clear()
            window.location.href = "/?error=SemPermissao"
        }

    }

    const gerarCard = (analise) => {
        const card = document.createElement("article")

        const dataCard = document.createElement("h1");
        //Pega o createdAt do registro, divide ele na separação de tempo para data, pega parte da data e divide para reorganizar em formato dd-mm-aaaa
        let dataPartes = analise.createdAt.split("T")[0].split("-")
        let data = dataPartes[2] + "/" + dataPartes[1] + "/" + dataPartes[0]
        dataCard.innerHTML = data
        dataCard.classList.add("tituloCard")
        card.append(dataCard)

        const textoLimitado = document.createElement("p");
        textoLimitado.classList.add("textCard")
        textoLimitado.innerHTML = analise.texto
        card.append(textoLimitado);

        card.addEventListener("click", () => {
            window.location.href = "/main/analise?analise=" + JSON.stringify(analise)
        })

        return card
    }

    const carregarCards = (analises) => {
        mainGrid.innerHTML = ""
        analises.forEach((analise) => {
            mainGrid.appendChild(gerarCard(analise))
        })
    }

    const gerarAnalise = async () => {
        listaAnalise = await analiseService.buscaPorJogo(getID(), sessionStorage.getItem("token"))
        carregarCards(listaAnalise)
    }

    gerarAnalise()
    document.getElementById("salvar").addEventListener("click", chamarEditar)
    document.getElementById("editar").addEventListener("click", alternarEdicao)
    document.getElementById("cancelar").addEventListener("click", alternarEdicao)
    document.getElementById("excluir").addEventListener("click", chamarDel)


}