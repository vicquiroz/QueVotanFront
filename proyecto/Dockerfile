FROM node:14
WORKDIR /proyecto
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
RUN serve -s build -l 1080