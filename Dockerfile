# build stage
# FROM node:lts-alpine as build-stage
# FROM node:10.16.3 as build
FROM node:11-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
COPY .nuxt ./.nuxt
COPY utiltools ./utiltools
COPY static ./static
COPY nuxt.config.js ./

ENV HOST 0.0.0.0 
ENV PORT 80 
ENV NODE_ENV=production 
CMD ["npm","start"]
