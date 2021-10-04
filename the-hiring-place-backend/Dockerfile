FROM node:14-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN chmod +x wait-for-it.sh

CMD npm start
