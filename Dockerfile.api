FROM node:9.11.2-alpine

WORKDIR /opt/pizza-sync/backend
ADD ./backend .
RUN yarn

EXPOSE 3000

CMD NODE_ENV=production node index.js
