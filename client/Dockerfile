FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm install env-cmd
RUN npm run build:prod

FROM node:14
WORKDIR /usr/src/app
COPY --from=BUILDER /usr/src/app/build /usr/src/app/build

EXPOSE 5000

RUN npm install -g serve
CMD serve -p 5000 -s build:prod