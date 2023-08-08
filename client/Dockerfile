FROM node:18-alpine3.16 as build

WORKDIR /usr/src/build/app

COPY . /app
RUN npm install
RUN npm run build
CMD ["npm", "run dev"]