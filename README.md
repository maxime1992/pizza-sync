![Image](./logo/png/PS_logo_high_res_2.png?raw=true)

<hr>

## Features

- :pizza: Display pizzas from a given "pizza provider" (Ormeau, Ormeau with mocked data, Tutti Pizza, ...)
- :camera: Add your own pizzas pictures for a given pizza provider
- :octocat: "Connect" with your github username (no need for auth) and display your profile picture
- :heavy_plus_sign: Select 1 pizza or more, remove if needed
- :electric_plug: Realtime update with other people connected
- :money_with_wings: Choose pizzas by size/price
- :mag_right: Choose pizzas by ingredients, even if the pizza provider website doesn't provide this feature!
- :abc: Search pizza(s) by name
- :dizzy: Display an "easy order view" with pizzas grouped by their names
- :notebook: Download a CSV file that you can open with Calc or Excel to handle the money for the current order (who already paid and how much)
- :hourglass_flowing_sand: Set a countdown to limit the time of the order (from command line, realtime update on clients)
- :video_game: Possibility to implement your own pizza provider (with an helper class to keep things easy)
- :wrench: Possibility to implement new commands (with an helper class too)

| []()                                                                                                                   | []()                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| ![Image](https://user-images.githubusercontent.com/4950209/44301952-0e582380-a318-11e8-8642-bed4b6a76fb9.png?raw=true) | ![Image](https://user-images.githubusercontent.com/4950209/44301953-0ef0ba00-a318-11e8-9489-69d999647ce4.png?raw=true) |
| Enter your name or Github nickname..                                                                                     |..and sign in.                                                                                                                |
| ![Image](https://user-images.githubusercontent.com/4950209/44301954-0ef0ba00-a318-11e8-9c5c-03109f575405.png?raw=true) | ![Image](https://user-images.githubusercontent.com/4950209/44301955-0ef0ba00-a318-11e8-9a8b-bcc590a51df7.png?raw=true) |
| See connected people and their order(s)..                                                                            | ..or how a pizza looks like.                                                                                             |
| ![Image](https://user-images.githubusercontent.com/4950209/44301956-0ef0ba00-a318-11e8-874f-4200c6e171a5.png?raw=true) | ![Image](https://user-images.githubusercontent.com/4950209/44301957-0ef0ba00-a318-11e8-9922-c7461a197154.png?raw=true) |
| Find your favourite pizza by name..                                                                                                      | ...or by ingredients.                                                                                                      |
| ![Image](https://user-images.githubusercontent.com/4950209/44301958-0ef0ba00-a318-11e8-9d49-e983c7f88737.png?raw=true) | ![Image](https://user-images.githubusercontent.com/4950209/44301959-0f895080-a318-11e8-837c-9bf402a76a8e.png?raw=true) |
| Discover which ingredients are still available during a search.                                                                        | Access the *easy order view* before making a phone call.                                                                  |
| ![Image](https://user-images.githubusercontent.com/4950209/44301961-13b56e00-a318-11e8-95e4-e97fc7d8069d.png?raw=true) | ![Image](https://user-images.githubusercontent.com/4950209/44301963-144e0480-a318-11e8-8ab7-bdd31202d476.png?raw=true) |
| Admin can set the countdown..                                                                                            | ..but also the list of providers and choose one                                                                     |

## Why ?

This project has been built to easily order pizzas with my former colleagues.

We usually ordered at [l'Ormeau](http://pizzadelormeau.com/) and thus, the backend part of the project is parsing this website.  
_(note: at the time I built the app, L'Ormeau website was [like that](https://web.archive.org/web/20170619073245/http://www.pizzadelormeau.com/nos-pizzas))_

**_Pizza-Sync_** also accepts others _pizzas-providers_! So if you want to use it with your local pizzeria, you'd just have to add a new `pizza-provider` that parses the website.

## Is it just about Pizza ?

It could :pizza: :heart: ... But not totally.

**It's also a demo to show how to use Angular with the following stack :**

- **@angular/cli**
- **@angular/material**
- **@angular/flex-layout**
- **@ngrx/store**
- **@ngrx/effects**
- **@ngrx/entity**
- **socket.io**

**And [NestJs](https://github.com/nestjs/nest) on the backend.**

This is a medium size project, not too complicated but still, with a lot of things in it (normalized data with Redux, real time, little cli to interact with the app in real time from command line on the server, ...). If you see things to improve, feel free to open an issue, or even better: Make a PR!

## How do I run it locally ?

### Dev mode

**Terminal 1 :**

```
cd backend
yarn
yarn run start:watch
```

Then a prompt `pizza-sync$` will appear.
It's up to the admin to decide when the app should stop accepting orders.
Admin can change the countdown on the fly. To do that simply run the following command into the prompt `countdown --hour X --minute Y` with X = 11 and Y = 20 for example.
The app will update the countdown in realtime on the frontend. Even if the countdown has already reached 0, you can run this command multiple times.

**Terminal 2 :**

```
cd frontend
yarn
yarn start
```

You'll then be able to open the app at : [http://localhost:4200](http://localhost:4200).

### Docker mode (for production use)

There are 2 Dockerfiles:

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

There are plenty of things to do with this small project.
Here are some ideas :

- [ ] Improve the layout (theme, responsiveness, logo, ...)
- [ ] Angular universal ? Having a super fast init would be awesome !
- [ ] Create a PWA with at least a service worker to cache the assets
- [ ] Add mocks to run the app without the backend
- [ ] Deploy the app on Github pages (needs mocks first)

You can also take a look into the [issues](https://github.com/maxime1992/pizza-sync/issues) and pick up one which is not already assigned.

<hr>

![Image](https://github.com/happyksu/pizza-sync/blob/master/New_Logo/png/PS_icon_32.png?raw=true) Pizza-Sync logos have been designed by [Happyksu](https://github.com/happyksu)!
