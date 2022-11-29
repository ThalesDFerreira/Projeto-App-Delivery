#! /bin/bash

printf "\n> Preparando o campo pra execução dos testes\n\n"
PATH=$(npm bin):$PATH
export NODE_ENV=test
export CI=false
pm2 stop all | grep 'PM2'
pm2 delete all | grep 'PM2'
kill -9 $(lsof -t -i:3000) &> /dev/null & kill -9 $(lsof -t -i:3001) &> /dev/null
printf "\n"

function initialize_back_end () {
  printf "\n> ASYNC: Instalando o back-end e inicializando o banco de dados com o ORM\n"
  (
    cd ./back-end
    cacheFolderBack="/tmp/delivery-app-back-end-cache"
    rm -rf $cacheFolderBack
    npm_config_loglevel=silent npm install --cache $cacheFolderBack
    npx sequelize-cli db:drop
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
  )
}

function initialize_front_end() {
  printf "\n> ASYNC: Instalando o front-end e gerando uma build do projeto\n"
  (
    cd ./front-end
    cacheFolderFront="/tmp/delivery-app-front-end-cache"
    rm -rf $cacheFolderFront
    npm_config_loglevel=silent npm install --cache $cacheFolderFront
  )
}

initialize_back_end
sleep 10
initialize_front_end
sleep 10


printf "\n> Iniciando ambas aplicações\n\n"
pm2 start pm2.test.config.yml | grep 'PM2'

sleep 10

npx wait-on  -t 60000 http://localhost:3000

sleep 10

printf "\n> Continuando processos\n\n"
