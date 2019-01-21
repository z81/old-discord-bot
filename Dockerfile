FROM node:10-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

WORKDIR /usr/src/app

COPY package*.json bower.json .bowerrc ./

RUN npm set progress=false && \
  npm i --silent && \
  $(npm bin)/bower --allow-root i

RUN apk del native-deps

WORKDIR /app

COPY . /app
RUN npm install
CMD npm start