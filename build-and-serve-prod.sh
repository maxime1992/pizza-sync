#!/bin/bash

latestRemoteHash=$(git ls-remote https://github.com/maxime1992/pizza-sync.git HEAD | cut -d '	' -f 1)

latestLocalHash=$(git rev-parse HEAD)

needsGitUpdate=false

if [ "$latestRemoteHash" == "$latestLocalHash" ];then
  echo "GIT IS UP-TO-DATE, NO NEED TO FETCH AND REBASE"
else
  needsGitUpdate=true
  echo "GIT IS NOT UP-TO-DATE, FETCHING AND REBASING"
  git fetch && git pull --rebase
fi

exists()
{
  command -v "$1" >/dev/null 2>&1
}

isYarnAvailable=false

if exists yarn; then
  echo "YARN'S AVAILABLE"
  isYarnAvailable=true
else
  echo "YARN'S NOT AVAILABLE, FALLING BACK TO NPM"
fi

cd frontend
echo "UPDATING FRONTEND DEPENDENCIES"

if "$isYarnAvailable"; then
  yarn
else
  npm
fi

if [ "$needsGitUpdate" = true -o ! -d dist ]; then
  if [ -d dist ]; then
    rm -rf dist
  fi

  if exists yarn; then
    yarn run prod
  else
    npm run prod
  fi
fi

cd ../backend
echo "UPDATING BACKEND DEPENDENCIES"

if "$isYarnAvailable"; then
  yarn
else
  npm
fi

if [ "$needsGitUpdate" = true -o ! -d public ]; then
  if [ -d public ]; then
    rm -rf public
  fi

  cp -r ../frontend/dist/ ./public
fi

ip=$(ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p')

echo "PIZZA SYNC NOW AVAILABLE AT http://$ip:3000"

node index.js
