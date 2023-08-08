FROM node:18-alpine3.16 as builder
WORKDIR /app
COPY . /app
RUN npm install && npm run build

EXPOSE 3000
CMD ["npm", "run start"]
