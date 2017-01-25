const request = require('request')
const cheerio = require('cheerio')

const getPizzas = () => {
  return new Promise((resolve) => {
    // keep track of the IDs
    let ids = {
      _pizzaId: 0,
      get pizzaId() {
        return `pizzaId${this._pizzaId++}`
      },

      _pizzaCategoryId: 0,
      get pizzaCategoryId() {
        return `pizzaCategoryId${this._pizzaCategoryId++}`
      },

      _personId: 0,
      get personId() {
        return `personId${this._personId++}`
      }
    }

    // fetch the website
    request('http://www.pizzadelormeau.com/nos-pizzas/', (error, response, body) => {
      if (!error && response.statusCode == 200) {
        // build the response object containing the pizzas and pizzas categories
        const res = {
          pizzas: { byId: {}, allIds: [] },
          pizzasCategories: { byId: {}, allIds: [] },
          people: { byId: {}, allIds: [] }
        }

        const $ = cheerio.load(body)

        const sectionsDom = $('.entry-content .section')

        sectionsDom.map(i => {
          sectionDom = $(sectionsDom[i])

          const pizzaCategory = sectionDom.find($('.title')).children().remove().end().text()

          const finalPizzaCategory = {
            id: ids.pizzaCategoryId,
            name: pizzaCategory
          }

          res.pizzasCategories.byId[finalPizzaCategory.id] = finalPizzaCategory
          res.pizzasCategories.allIds.push(finalPizzaCategory.id)

          const pizzasDom = sectionDom.find($('.corps'))

          pizzasDom.map(j => {
            const pizzaDom = $(pizzasDom[j])

            const pizzaName = pizzaDom.find($('.nom')).children().remove().end().text()
            const pizzaIngredients = pizzaDom.find($('.composition')).text()
            const pizzaPricesDom = pizzaDom.find($('.prix'))

            const pizzaPrices = []
            pizzaPricesDom.map(k => {
              const price = $(pizzaPricesDom[k]).children().remove().end().text()
              pizzaPrices.push(parseFloat(price))
            })

            const finalPizza = {
              id: ids.pizzaId,
              name: pizzaName,
              ingredients: pizzaIngredients,
              prices: pizzaPrices,
              category: finalPizzaCategory.id
            }

            res.pizzas.byId[finalPizza.id] = finalPizza
            res.pizzas.allIds.push(finalPizza.id)
          })
        })

        resolve(res);
      }
    })
  })
}

module.exports = { getPizzas }
