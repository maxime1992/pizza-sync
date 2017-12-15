FROM  node:alpine as builder

# needed to build (python needed for compiling node-sass, for instance...)
RUN apk add --no-cache \
    make \
    gcc \
    g++ \
    python

WORKDIR /opt/pizza-sync
ADD . .

# frontend
RUN cd frontend && yarn && yarn run build:prod && rm -rf node_modules

# backend
RUN cd backend/ && yarn

# --------------------------------------------------------------------------

FROM node:alpine

WORKDIR /opt/pizza-sync
COPY --from=builder /opt/pizza-sync/backend .
COPY --from=builder /opt/pizza-sync/frontend/dist public

EXPOSE 3000

CMD node index.js
