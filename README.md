virtual-jonah2
==============

Portando Virtual Jonah para o ThreeJS

Testes
-------------

Para testar o projeto, é necessária a biblioteca Node.js (http://nodejs.org/).

Com o Node.js, é possível instalar as dependências do projeto executando na raiz do projeto:
    npm install

grunt-cli é uma dependência opicional do projeto que adiciona o comando grunt
ao PATH do sistema operacional, permitindo realizar com facilidade tarefas como
minificar e testar o projeto. Para instalar basta executar o comando (pode ser
necessária a permissão de administrador em alguns sistemas):

    npm install -g grunt-cli

Por fim executamos a tarefa de testes com o grunt
    grunt qunit
