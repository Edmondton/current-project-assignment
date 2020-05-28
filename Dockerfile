FROM node:10

WORKDIR /usr/sr/app

COPY package*.json ./

RUN npm install
RUN npm build

COPY . .

EXPOSE 3000

CMD ["node", "dist/server/index.js"]
