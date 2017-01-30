#!/bin/bash

git pull --rebase

cd frontend

yarn

if [ -d dist ]; then
  rm -rf dist
fi

npm run prod

cd ../backend

if [ -d public ]; then
  rm -rf public
fi

cp -r ../frontend/dist/ ./public

ip=$(ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p')

echo "PIZZA SYNC NOW AVAILABLE AT http://$ip:3000"

node index.js
