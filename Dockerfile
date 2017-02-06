FROM node:5.2.0-slim
MAINTAINER kaiyadavenport@gmail.com
WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install
COPY ./src /app/src
EXPOSE 8080
ENTRYPOINT ["node", "src/index.js"]