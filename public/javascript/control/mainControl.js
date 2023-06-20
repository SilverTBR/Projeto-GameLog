import jogoService from "../service/jogoService.js"

window.onload = () => {
    let listaJogos = [];
    //document.getElementById("perfil").href = "/main/perfil?token="+token
    //document.getElementById("jogos").href = "/main/jogos?token="+token
    const mainGrid = document.getElementById("grid");

    const getID = () => {
        return document.getElementById("id").value
    }

    const gerarCard = (jogo) => {
        const card = document.createElement("article")

        const tituloCard = document.createElement("h1");
        tituloCard.innerHTML = jogo.nome
        card.append(tituloCard)

        const generoP = document.createElement("p");
        generoP.innerHTML = jogo.genero + " - " + jogo.subgenero;
        card.append(generoP);

        const imageCard = document.createElement("img")
        imageCard.src = "/img/noImage.png"
        imageCard.classList.add("image-card")
        card.append(imageCard)

        const dev = document.createElement("p");
        dev.classList.add("dev-dist")
        dev.innerHTML = jogo.desenvolvedora;
        card.append(dev)

        const distri = document.createElement("small");
        distri.classList.add("dev-dist")
        distri.innerHTML = jogo.distribuidora;
        card.append(distri)

        //incerto se deveria fazer assim passando jogo como query ou qual outra forma seria melhor
        card.addEventListener("click", () => {
            window.location.href = "/main/jogos?token="+sessionStorage.getItem("token")+ "&jogo="+ JSON.stringify(jogo)
        })

        return card
    }

    const carregarCards = (jogos) => {
        mainGrid.innerHTML = ""
        jogos.forEach((jogo) => {
            mainGrid.appendChild(gerarCard(jogo))
        })
    } 

    const gerarJogos = async () => {
        listaJogos = await jogoService.buscaPorUser(getID(), sessionStorage.getItem("token"))
        carregarCards(listaJogos)
    }    


    gerarJogos()
}