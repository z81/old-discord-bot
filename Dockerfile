FROM node:10-alpine

WORKDIR /usr/src/app

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g

RUN apk add  --no-cache ffmpeg

WORKDIR /app

COPY . /app
RUN npm install
RUN npm run postinstall
CMD npm start