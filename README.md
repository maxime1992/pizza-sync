# Pizza-Sync

![Image](./demo.gif?raw=true)

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

This is a medium size project, not too complicated but still, with a lot of things in it (normalized data with Redux, real time, little cli to interact with the app in command line, ...). If you see things to improve, feel free to open an issue, or even better: Make a PR !

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

### Prod mode
Simply run :
```
./build-and-serve-prod.sh
```

It'll check if any update from *origin/master* is available.
If so, it'll update the project and the dependencies.
Then it'll build the frontend and copy it into the backend folder so it can be served.
The server starts and you can access the app at [http://localhost:3000](http://localhost:3000).

### Docker mode

Build a pizza-sync image:
```bash
docker build -t pizza-sync:latest .
```

Then run a container:
```bash
docker run -it -d --name pizza-sync -p 8081:3000 pizza-sync:latest
```

Your container will listen on port 3000, so just link it on any port you want (8081 is proposed here).
Just open your browser on localhost:8081 and enjoy.

### Contribution
Any contribution is very welcome :sparkles: !

There's plenty of things to do with this small project.
Here are some ideas :

- [ ] Improve the layout (theme, responsiveness, logo, ...)
- [ ] Angular universal ? Having a super fast init would be awesome !
- [ ] Create a PWA with at least a service worker to cache the assets
- [ ] Add mocks to run the app without the backend
- [ ] Deploy the app on Github pages (needs mocks first)
- [ ] Improve the parsing process by providing a default parser with custom cheerio requests

You can also take a look into the [issues](https://github.com/maxime1992/pizza-sync/issues) and pick up one which is not already assigned.
