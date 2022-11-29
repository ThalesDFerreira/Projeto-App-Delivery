export NODE_ENV=development
cd ./back-end
npx sequelize-cli db:drop --debug
npx sequelize-cli db:create --debug
npx sequelize-cli db:migrate --debug
npx sequelize-cli db:seed:all --debug
