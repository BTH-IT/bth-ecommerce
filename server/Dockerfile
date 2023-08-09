FROM node:18-alpine3.16 as builder

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/main"]
