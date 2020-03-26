FROM node:13-alpine

EXPOSE 5000
WORKDIR /usr/app
RUN yarn global add typescript

COPY package* ./

RUN yarn && yarn cache clean
COPY ./src ./src
COPY tsconfig.json .
RUN yarn build

CMD ["node", "/usr/app/dist/index.js"]

