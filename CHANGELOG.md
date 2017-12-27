<a name="v2.0.0"></a>
# [v2.0.0](https://github.com/maxime1992/pizza-sync/compare/v1.1.0...v) (2017-12-27)


### Bug Fixes

* **backend:** pizzas names are not cleaned correctly ([75b8d77](https://github.com/maxime1992/pizza-sync/commit/75b8d77)), closes [#49](https://github.com/maxime1992/pizza-sync/issues/49)
* **frontend:** show order summary and CSV download ([bf86668](https://github.com/maxime1992/pizza-sync/commit/bf86668))


### Features

* **product:** dockerize pizza-sync ([36709c5](https://github.com/maxime1992/pizza-sync/commit/36709c5)) thanks to [@ppaysant](https://github.com/ppaysant) with the help of [@tbille](https://github.com/tbille) and  [@victornoel](https://github.com/victornoel)


### Refactor

* **backend:** complete refactor with [NestJs](https://github.com/nestjs/nest) [pull#48](https://github.com/maxime1992/pizza-sync/pull/48)


<a name="v1.1.0"></a>
# [v1.1.0](https://github.com/maxime1992/pizza-sync/compare/v1.0.0...v1.1.0) (2017-11-15)


### Bug Fixes

* **frontend:** redirect wrong URLs to the app ([8dc3a99](https://github.com/maxime1992/pizza-sync/commit/8dc3a99))
* **frontend:** generation of CSV ([cc6a643](https://github.com/maxime1992/pizza-sync/commit/cc6a643))
* **backend:** remove accents on pizzas names when trying to find the corresponding pictures ([0f41662](https://github.com/maxime1992/pizza-sync/commit/0f41662))


### Features

* **frontend:** add a search bar to find pizza(s) by name ([345ea10](https://github.com/maxime1992/pizza-sync/commit/345ea10))
* add pizza images and a fallback image ([761cfcc](https://github.com/maxime1992/pizza-sync/commit/761cfcc))
* add pizzas-provider information ([5212a29](https://github.com/maxime1992/pizza-sync/commit/5212a29)), closes [#22](https://github.com/maxime1992/pizza-sync/issues/22)
* **frontend:** click on image to display it ([c6b99e0](https://github.com/maxime1992/pizza-sync/commit/c6b99e0))
* **frontend:** disable easy order view button if there's no pizza order ATM ([ac7c914](https://github.com/maxime1992/pizza-sync/commit/ac7c914))
* **frontend:** display selected ingredients and filter the pizza view accordingly ([64b3773](https://github.com/maxime1992/pizza-sync/commit/64b3773))
* **frontend:** download a CSV to handle the $$$ ([5f574dc](https://github.com/maxime1992/pizza-sync/commit/5f574dc))
* **frontend:** put the searched pizza into url so it can persist on reload ([f104a36](https://github.com/maxime1992/pizza-sync/commit/f104a36))
* **frontend:** replace control-f binding by focusing on search input ([d28406c](https://github.com/maxime1992/pizza-sync/commit/d28406c))
* **frontend:** search pizza without taking accents into account ([0dcd5ca](https://github.com/maxime1992/pizza-sync/commit/0dcd5ca))
* **frontend:** when selecting ingredients, hide the ones that wouldn't give any result for currently selected pizzas ([daee72c](https://github.com/maxime1992/pizza-sync/commit/daee72c))



