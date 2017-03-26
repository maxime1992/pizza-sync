# Pizza-Sync

![Image](./demo.gif?raw=true)

## Why ?
This project has been built to easily order our pizzas at work.

We usually order at [pizzadelormeau](http://www.pizzadelormeau.com) and thus, the backend part of the project is parsing this website.
There's an [opened issue](https://github.com/maxime1992/pizza-sync/issues/5) so ***Pizza-Sync*** can accept others *pizzas-providers*. 

## Is it just about Pizza ?
It could :pizza: :heart: ... But not totally.

It's also a demo to show how to use Angular with the following stack :
- **@angular/cli**  
- **@angular/material**  
- **@angular/flex-layout**  
- **@ngrx/store**  
- **@ngrx/effects**  
- **socket.io**  

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

You'll be able to open the app at : [http://localhost:4200](http://localhost:4200).

### Prod mode
Simply run :
```
./build-and-serve-prod.sh
```

It'll check if any update from *origin/master* is available.  
If so, it'll update the project and the dependencies.  
Then it'll build the frontend and copy it into the backend folder so it can be served.  
The server starts and you can access the app at [http://localhost:3000](http://localhost:3000).

### Contribution
Any contribution is very welcome :sparkles: !

There's plenty of things to do with this small project.  
Here are some ideas :  

- [ ] Improve the layout (theme, responsiveness, logo, ...)  
- [ ] Angular universal ? Having a super fast init would be awesome !  
- [ ] Add a timer to block the orders when it reaches 0  
- [ ] Randomly select someone to call the pizzeria  
- [ ] Create a PWA with at least a service worker to cache the assets  
- [ ] Add mocks to run the app without the backend  
- [ ] Deploy the app on Github pages (needs mocks first)  

You can also take a look into the [issues](https://github.com/maxime1992/pizza-sync/issues) and pick up one which is not already assigned.
