import analiseService from "../service/analiseService.js"

window.onload = () => {
  if (!sessionStorage.getItem("token")) {
    window.location.href = "/?error=SemPermissao";
  }
  let usuario = JSON.parse(sessionStorage.getItem("usuario"));
  document.getElementById("perfil").innerHTML += usuario.nome
  let data = [];
  let labels = [];
  let resultado = null;

  const carregarDados = async () => {
    resultado = await analiseService.qntAnalisePorJogos(usuario.id, sessionStorage.getItem("token"));
    if (!resultado.status) {
      window.location.href = "/?error=SemPermissao";
    }

    labels = resultado.dados.map(dado => dado['Jogo.nome'])
    data = resultado.dados.map(dado => dado['quantidadeTextos'])

    gerarGrafico();
  }


  const gerarGrafico = () => {

    console.log(labels)
    console.log(data)
    const ctx = document.getElementById('myChart')

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Quantidade de Textos',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });
  }


    
  carregarDados();
}