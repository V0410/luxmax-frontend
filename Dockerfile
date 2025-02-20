FROM node:18.20.0-alpine as base

RUN echo "test... " 
WORKDIR /var/www/
RUN echo "test" 
COPY package.json yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .

RUN yarn build

RUN echo "Test"

FROM node:18.17.0-alpine

WORKDIR /var/www/ 

COPY --from=base /var/www/ .

ENV HOST 0.0.0.0

EXPOSE 3000

CMD ["yarn", "start"]