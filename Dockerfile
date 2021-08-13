FROM node:14-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3000

CMD npx wait-on tcp:postgres:5432 && npm run dev