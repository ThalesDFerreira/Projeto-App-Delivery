COMO RODAR O PROJETO:

1 - Ter o docker instalado na máquina;

2 - Usando o terminal instancie um docker com o comando "docker container run --name app-delivery -e MYSQL_ROOT_PASSWORD=senhaDoDB -d -p 3306:3306 mysql";

3 - Após concluído o processo confirme se todos os container estarão "UP", com o seguinte comando: "docker ps -a";

4 - Então, entre no diretório raiz do projeto (pasta "Projeto-App-Delivery") e abra com o VScode;

5 - Após clique em "Terminal" na barra de atalhos do VScode, localizada do parte superior direita, e clique em "Novo Terminal" (atalho "Ctrl" + "J" - linux);

6 - Com o VScode aberto, edite o nome do arquivo ".envexemple" para ".env";

7 - Executar o comando abaixo no terminal aberto no passo "3", sem as aspas: 

"npm start" // para iniciar a aplicação;
"npm stop" // para parar a aplicação;