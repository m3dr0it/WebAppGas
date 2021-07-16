FROM node:14

WORKDIR /web-app-gas

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]
