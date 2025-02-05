FROM node:18.20.0-alpine as base

WORKDIR /var/www/

COPY . .

RUN yarn install

RUN yarn build

#RUN rm -rf node_modules

RUN yarn install 

RUN echo "Test"

FROM node:18.17.0-alpine

WORKDIR /var/www/ 

COPY --from=base /var/www/ .

ENV HOST 0.0.0.0

EXPOSE 3000

CMD ["yarn", "start"]
