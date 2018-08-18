# Pizza-Sync

![Image](./demo.gif?raw=true)

## Features
- Display pizzas from a given "pizza provider"  
- Add your own pizzas pictures for a pizza provider  
- "Connect" with your github username (no need for auth) and display your profile picture  
- Select 1 pizza or more, remove if needed  
- Realtime  
- Choose pizzas by size/price  
- Choose a pizza by it's ingredients, even if the pizza provider website doesn't provide this feature  
- Search pizza(s) by name  
- Display an "easy order view" with pizzas grouped by their names  
- Download a CSV file to handle the money for the current order  
- Set a countdown to limit the time to order (from command line, realtime)  
- Possibility to implement your own pizza provider (with an helper class)  
- Possibility to implement new commands (with an helper class)  

## Why ?
This project has been built to easily order our pizzas at work.

We usually order at [l'Ormeau](http://www.pizzadelormeau.com/index.html%3Fp=61.html) and thus, the backend part of the project is parsing this website.

***Pizza-Sync*** also accepts others *pizzas-providers*! So if you want to use it with your local pizzeria, you'd just have to add a new `pizza-provider` that parses the website.

## Is it just about Pizza ?
It could :pizza: :heart: ... But not totally.

**It's also a demo to show how to use Angular with the following stack :**
- **@angular/cli**
- **@angular/material**
- **@angular/flex-layout**
- **@ngrx/store**
- **@ngrx/effects**
- **socket.io**

**And [NestJs](https://github.com/nestjs/nest) on the backend.**

This is a medium size project, not too complicated but still, with a lot of things in it (normalized data with Redux, real time, little cli to interact with the app in command line, ...).  
If you see things to improve, feel free to open an issue, or even better: Make a PR !

## I'd like to dig into the code but it seems huge and I don't know where to start
No worries ! I've created a pull request per feature. Just take a look to the list of [PR](https://github.com/maxime1992/pizza-sync/pulls?q=is%3Apr+is%3Aclosed) from the beginning and it should help you get started.

## How do I run it locally ?
### Dev mode
**Terminal 1 :**
```
cd backend
yarn
nodemon index.js
```

Then a prompt `pizza-sync$` will appear.
It's up to the admin to decide when the app should stop accepting orders.
By default, it's set to current time + 1 hour.
Admin can change the countdown on the fly. To do that simply run the following command into the prompt `countdown --hour X --minute Y` with X = 11 and Y = 20 for example.
The app will update the countdown in realtime. Even if the countdown has already reached 0, you can run this command multiple times.

If you don't have *yarn* you can also run `npm i`.
You can use *nodemon* to auto-reload server if needed or simply run `node index.js` otherwise.

**Terminal 2 :**
```
cd frontend
yarn
ng serve
```

You'll then be able to open the app at : [http://localhost:4200](http://localhost:4200).

### Docker mode (for production use)
There's 2 Dockerfiles:
- Dockerfile.api - Run the node server containing the API (HTTP + Socket)
- Dockerfile.nginx - Run an nginx server which serves static assets directly and let HTTP + Sockets go through

The simplest way to run them both:
```
docker-compose up
```

If you do not want to use `docker-compose`, you can build and run them separately:
```bash
# terminal 1
docker build -f Dockerfile.api -t pizza-sync-api .
docker run -it --rm --name pizza-sync-api pizza-sync-api

# terminal 2
docker build -f Dockerfile.nginx -t pizza-sync-nginx .
docker run -it --rm -p 3000:80 --name pizza-sync-nginx --link pizza-sync-api:pizza-sync-api pizza-sync-nginx
```

Then just go to [http://localhost:3000](http://localhost:3000).

When using `docker-compose`, you'll see the logs of the API but also the logs from NGINX.  
If you want to run commands on the API (`countdown`, `providers`, `provider`, etc) you need to do the following, into another terminal:  
```
docker-compose up
docker ps
# look for the ID of the API container, let's call it API-ID
docker attach API-ID
```

### Contribution
Any contribution is very welcome :sparkles: !

There's plenty of things to do with this small project.
Here are some ideas :

- [ ] Improve the layout (theme, responsiveness, logo, ...)
- [ ] Angular universal ? Having a super fast init would be awesome !
- [ ] Create a PWA with at least a service worker to cache the assets
- [ ] Add mocks to run the app without the backend
- [ ] Deploy the app on Github pages (needs mocks first)

You can also take a look into the [issues](https://github.com/maxime1992/pizza-sync/issues) and pick up one which is not already assigned.
