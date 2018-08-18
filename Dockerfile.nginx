FROM node:9.11.2-alpine as frontend-builder

# needed to build (python needed for compiling node-sass, for instance...)
RUN apk add --no-cache \
    make \
    gcc \
    g++ \
    python

WORKDIR /opt/pizza-sync
ADD ./frontend ./frontend
RUN cd frontend && yarn && yarn run build:prod && rm -rf node_modules

# --------------------------------------------------------------------------

FROM nginx:1.15.2-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=frontend-builder /opt/pizza-sync/frontend/dist /usr/share/nginx/html
