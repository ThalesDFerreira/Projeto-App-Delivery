COMO RODAR O PROJETO:

1 - Ter o docker instalado na máquina;

2 - Usando o terminal instancie um docker com o comando "docker container run --name delivery-app -e MYSQL_ROOT_PASSWORD=senhaDoDB -d -p 3306:3306 mysql";

3 - Após concluído o processo confirme se todos os container estarão "UP", com o seguinte comando: "docker ps -a";

4 - Então, entre no diretório raiz do projeto (pasta "Projeto-App-Delivery") e abra com o VScode;

5 - Após clique em "Terminal" na barra de atalhos do VScode, localizada do parte superior direita, e clique em "Novo Terminal" (atalho "Ctrl" + "J" - linux);

6 - Com o VScode aberto, instale as dependencias do projeto utilizando o comando "npm install";

7 - Com o VScode aberto, edite o nome do arquivo ".envexemple" para ".env";

8 - Executar o comando abaixo no terminal aberto no passo "5", sem as aspas: 

"npm start" // para iniciar a aplicação;
"npm stop" // para parar a aplicação;

![Peek 12-01-2023 17-52](https://user-images.githubusercontent.com/99926224/212533522-dec7ed82-e6ff-4807-8aea-bf3ff7fa513e.gif)
