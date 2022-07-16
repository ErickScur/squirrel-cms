FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

RUN npm run build
RUN cp .env ./dist
CMD ["npm", "run", "start"]