FROM node:18-alpine3.16 as builder

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
