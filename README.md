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

Modelo de dados
---------------

Na pasta resources do projeto estão 3 arquivos contendo as possíveis configurações de Locação, Orientação e Gesto para a mão do avatar. São eles:

- resources/locations.json
- resources/orientations.json
- resources/shapes.json

As configurações de Locação e Gesto são compostas por listas de bones e seus respectivos quaternions(representando uma rotação), e se encontram em coordenadas locais, isto é, rotacionadas em relação ao seu bone pai na hierarquia do esqueleto. As configurações de Orientação são um caso especial e contem quaternions em coordenadas globais, isto é, representando uma rotação de acordo com o sistema de coordenadas da cena.
