const request = require('request')
const cheerio = require('cheerio')

const { requestOptions } = require('../helpers/http.helper')

const { PizzasModel } = require('../models/pizzas.model')
const { PizzasCategoriesModel } = require('../models/pizzas-categories.model')
const { IngredientsModel } = require('../models/ingredients.model')

class PizzaDeLOrmeau {
  constructor() {
    this._pizzeria = {
      name: `Pizza de l'Ormeau`,
      phone: '',
      url: 'http://www.pizzadelormeau.com/nos-pizzas/'
    }
  }

  getPizzasAndPizzasCategories() {
    return new Promise(resolve => {
      // fetch the website
      request(
        Object.assign({ url: this._pizzeria.url }, requestOptions),
        (error, response, body) => {
          if (!error && response.statusCode == 200) {
            // build the response object containing the pizzas and pizzas categories
            const res = {
              pizzeria: this._pizzeria,
              pizzas: [],
              pizzasCategories: [],
              ingredients: []
            }

            const $ = cheerio.load(body)

            res.pizzeria.phone = $('.header-main .site_info').text()

            const sectionsDom = $('.entry-content .section')

            sectionsDom.map(i => {
              const sectionDom = $(sectionsDom[i])

              const pizzaCategory = sectionDom.find($('.title')).children().remove().end().text()

              const finalPizzaCategory = {
                id: PizzasCategoriesModel.getNewId(),
                name: pizzaCategory,
                pizzasIds: []
              }

              res.pizzasCategories.push(finalPizzaCategory)

              const pizzasDom = sectionDom.find($('.corps'))

              pizzasDom.map(j => {
                const pizzaDom = $(pizzasDom[j])

                const pizzaName = pizzaDom.find($('.nom')).children().remove().end().text()
                const pizzaIngredientsTxt = pizzaDom.find($('.composition')).text()
                const pizzaPricesDom = pizzaDom.find($('.prix'))

                const pizzaIngredientsTxtArray = pizzaIngredientsTxt
                  .replace('.', '')
                  .replace(', ', ',')
                  .trim()
                  .split(',')
                  // some pizzas do not have ingredients as they're already written in their title
                  // for example "Poire Williams / chocolat", "Banane / Chocolat" and "Ananas / Chocolat"
                  // we do not want to have empty ingredients and thus, they should be removed
                  .filter(x => x !== '');

                const pizzaIngredients = pizzaIngredientsTxtArray.map(IngredientsModel.registerIfNewAndGetId)

                const pizzaPrices = []
                pizzaPricesDom.map(k => {
                  const price = $(pizzaPricesDom[k]).children().remove().end().text().replace(',', '.')
                  pizzaPrices.push(parseFloat(price))
                })

                const finalPizza = {
                  id: PizzasModel.getNewId(),
                  name: pizzaName,
                  ingredientsIds: pizzaIngredients,
                  prices: pizzaPrices
                }

                finalPizzaCategory.pizzasIds.push(finalPizza.id)
                res.pizzas.push(finalPizza)
              })
            })

            res.ingredients = IngredientsModel.getIngredients()

            resolve(res)
          }
        })
    })
  }
}

module.exports = { PizzaDeLOrmeau }
