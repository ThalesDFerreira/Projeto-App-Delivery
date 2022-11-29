#! /bin/bash

printf "\n> Preparando o campo pra execução do pm2\n\n"
PATH=$(npm bin):$PATH
export NODE_ENV=development
pm2 stop all | grep 'PM2'
pm2 delete all | grep 'PM2'
kill -9 $(lsof -t -i:3000) &> /dev/null & kill -9 $(lsof -t -i:3001) &> /dev/null
printf "\n"

printf "\n> Iniciando ambas aplicações\n\n"
pm2 start pm2.dev.config.yml | grep 'PM2'

printf "\n> Continuando processos\n\n"
