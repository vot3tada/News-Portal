FROM node:18-slim
WORKDIR /app

#RUN apk add --no-cache python3 py3-pip make g++

RUN ln -sf python3 /usr/bin/python && \
    ln -sf pip3 /usr/bin/pip

COPY package*.json ./


RUN npm install

COPY . .

CMD ["node", "server.js"]