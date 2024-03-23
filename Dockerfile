FROM node:lts-alpine

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:dev"]