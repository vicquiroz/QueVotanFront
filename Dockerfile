FROM node:14

WORKDIR /proyecto
COPY . .
RUN npm install

CMD ["npm","start"]