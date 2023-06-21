import analiseService from "../service/analiseService.js"
import jogoService from "../service/jogoService.js"

window.onload = () => {
    if(!sessionStorage.getItem("token")){
        window.location.href = "/?error=SemPermissao";
    }
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));
    document.getElementById("perfil").innerHTML += usuario.nome

    const listaDrop = document.getElementById("dropMenu");
    let idJogo = ""

    const getAnalise = () => {
        return document.getElementById("analise").value
    }

    const validarCampos = () => {
        if(idJogo != "" && getAnalise() != ""){
            return true
        }
        return false
    }

    const carregarJogos = async () => {
       let lista = await jogoService.buscaPorUser(usuario.id,sessionStorage.getItem("token"));
       lista.forEach(jogo => {
            const opcao = document.createElement("option");
            opcao.value = jogo.id;
            opcao.text = jogo.nome;
            listaDrop.appendChild(opcao)
       });
    }

    listaDrop.addEventListener("change", () =>{
        idJogo = listaDrop.value
    })

    const chamarCadastro = async () => {
        if(validarCampos()){
            let resposta = await analiseService.cadastrar(idJogo, getAnalise(), usuario.id, sessionStorage.getItem("token"));
            if(!resposta.errors){
                window.location.href = "http://localhost:3000/main";
            }else{
                document.getElementById("aviso").style.display = "flex"
            }
        }else{
            document.getElementById("aviso").style.display = "flex"
        }
    }

    document.getElementById("salvar").addEventListener("click", chamarCadastro)

    carregarJogos()
}