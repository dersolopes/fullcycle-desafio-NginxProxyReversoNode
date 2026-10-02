FROM node:18-alpine

RUN apk add --no-cache wget

WORKDIR /usr/src/app

# Baixa o binário correto do dockerize para aguardar o MySQL antes de iniciar o app
RUN wget -O /tmp/dockerize-linux-amd64-v0.6.1.tar.gz https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf /tmp/dockerize-linux-amd64-v0.6.1.tar.gz \
    && rm /tmp/dockerize-linux-amd64-v0.6.1.tar.gz

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000