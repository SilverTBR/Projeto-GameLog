# PROJETO GAMELOG

DESENVOLVEDOR:
- Eduardo Pereira Baratera.

CONTEXTO DO PROJETO:
Este projeto foi desenvolvido para a materia de programação de WEB 2 da Universidade Tecnológica Federal do Paraná de Cornelio Procopio orientado pelo professor Adriano Rivolli Da Silva.

DESCRIÇÃO DO PROJETO:
Pagina inspirada no backloGGD, qual busca ser uma pagina onde se armazenar os jogos que uma pessoa terminou ou deseja terminar, neste projeto teve algumas alterações com base nesta ideia para atingir os requisitos do professor, a ideia deste projeto era colocar em pratica as diversas cosias que foram aprendidas durante o periodo de WEB 2, como uso e desenvolvimento de API REST, template em mustache, validação por joi, conexão com o banco de dados por sequelize.

FUNCIONALIDADES:
- CRUD de usuario;
- CRUD de jogos;
- Na listagem de jogos ter possibilidade de ordenar a listagem com base em atributos;
- Exibir um grafico de analises feitas por jogo;
- Capacidade de enviar email de contato;
- Impossibilitar acessar paginas enquanto não estiver logado.

TECNOLOGIAS UTILIZADAS:
- Node.JS: Utilizado para hostear a parte do servidor do site;
- Express: Utilizado para o desenvolvimento de APIs REST que comuniquem o front-end com o backend, realizando chamadas no banco de dados principalmente;
- JavaScript: Utilizado para o desenvolvimento da parte logica do projeto;
- Mustache Express: Utilizado para para o desenvolvimento das templates do site;
- Node Mailer: Utilizado para realizar o envio de email na parte de contato;
- JOI: Utilizado para realizar validações de informações;
- Sequelize: Utilizado para se conectador ao banco de dados mySQL e realizar operações sobre o mesmo;
- MySQL: Utilizado como banco de dados para este site;
- Chart.JS: Utilizado para criação de grafico de quantidades de analises por jogo.

INICIALIZAÇÂO:
- É necessario que tenha MySQL previamente instalado;
- No .env as inforamções para entrar no MySQL;
- O node.JS instalado na maquina;
- Na pasta do projeto realizar o comando: NPM start
