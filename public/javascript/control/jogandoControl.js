import jogoService from "../service/jogoService.js"

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

    const definirAviso = (error) => {
        if (error.errors == "0editar") {
            document.getElementById("aviso-text").innerHTML = "Não foi possivel editar!"
        }
        else if(error.errors == "ImpossivelEditar"){
            document.getElementById("aviso-text").innerHTML = "Impossivel editar usuario!"
        }
        document.getElementById("aviso").style.display = "flex"
    }

    
    const verificarCampos = () => {
        if(getNome() != "" && getGenero() != "" && getSubgenero() != "" && getDesenvolvedora() != "" && getDistribuidora != ""){
            return true
       }
       return false;
    }
    const camposInput = document.querySelectorAll('.disabled-input');
    let valorCampos = []

    function alternarEdicao() {
        const btnEditar = document.getElementById('editar');
        const btnSalvar = document.getElementById('salvar');
        const btnExcluir = document.getElementById('excluir');
        const btnCancelar = document.getElementById('cancelar');
        const btnAddAnalise = document.getElementById('addAnalise');

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
          btnAddAnalise.style.display = 'none';
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
          btnAddAnalise.style.display = 'block';
      }
      }


      const chamarEditar = async () => {
        if(verificarCampos()){
            let resultado = await jogoService.editar(getID(), getNome(), getDesenvolvedora(), getDistribuidora(), getGenero(), getSubgenero(), sessionStorage.getItem("token"));
            if(!resultado.errors){
              window.location.href = "/main?token="+sessionStorage.getItem("token")
            }else{
                document.getElementById("aviso").style.display = "flex"
            }
        }else{
            document.getElementById("aviso").style.display = "flex"
        }
    }

    const chamarDel = async () => {
        let resultado = await jogoService.deletar(getID(), sessionStorage.getItem("token"))
        if(!resultado.errors){
            window.location.href = "/main?token="+sessionStorage.getItem("token")
        }else{
            //Fiz dessa forma pois o erro que poderia dar é id invalida ou algo desse tipo e se tal erro ocorrer num é para estar ali, pelo menos acho
            sessionStorage.clear()
            window.location.href = "/?error=SemPermissao"
        }

    }




      document.getElementById("salvar").addEventListener("click", chamarEditar)
      document.getElementById("editar").addEventListener("click", alternarEdicao)
      document.getElementById("cancelar").addEventListener("click", alternarEdicao)
      document.getElementById("excluir").addEventListener("click", chamarDel)
  

}