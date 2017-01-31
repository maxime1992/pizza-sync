const request = require('request')
const cheerio = require('cheerio')

const requestOptions = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/55.0.2883.87 Chrome/55.0.2883.87 Safari/537.36'
  }
}

class Pizzas {
  constructor() {
    this._pizzaId = 0
    this._pizzaCategoryId = 0
    this._userId = 0
    this._orderId = 0

    this.pizzas = null
  }

  _getPizzaId() {
    return `pizzaId${this._pizzaId++}`
  }

  _getPizzaCategoryId() {
    return `pizzaCategoryId${this._pizzaCategoryId++}`
  }

  _getUserId() {
    return `userId${this._userId++}`
  }

  _getOrderId() {
    return `orderId${this._orderId++}`
  }

  addOrder(order) {
    const orderId = this._getOrderId()

    this.pizzas.orders.byId[orderId] = order
    this.pizzas.orders.byId[orderId].id = orderId

    this.pizzas.orders.allIds.push(orderId)

    return this.pizzas.orders.byId[orderId]
  }

  removeOrder(orderId) {
    if (typeof this.pizzas.orders.byId[orderId] === 'undefined') {
      return false
    }

    delete this.pizzas.orders.byId[orderId]

    this.pizzas.orders.allIds = this.pizzas.orders.allIds.filter(orderIdTmp => orderIdTmp !== orderId)
    return true
  }

  getPizzas() {
    return new Promise(resolve => {
      if (this.pizzas) {
        resolve(this.pizzas)
        return
      }

      // fetch the website
      request(
        Object.assign({ url: 'http://www.pizzadelormeau.com/nos-pizzas/' }, requestOptions),
        (error, response, body) => {
          if (!error && response.statusCode == 200) {
            // build the response object containing the pizzas and pizzas categories
            const idUser1 = this._getUserId()
            const idUser2 = this._getUserId()

            const idOrder1 = this._getOrderId()
            const idOrder2 = this._getOrderId()
            const idOrder3 = this._getOrderId()

            const res = {
              pizzas: { byId: {}, allIds: [] },
              pizzasCategories: { byId: {}, allIds: [] },
              users: { byId: {}, allIds: [] },
              orders: { byId: {}, allIds: [] }
            }

            const $ = cheerio.load(body)

            const sectionsDom = $('.entry-content .section')

            sectionsDom.map(i => {
              const sectionDom = $(sectionsDom[i])

              const pizzaCategory = sectionDom.find($('.title')).children().remove().end().text()

              const finalPizzaCategory = {
                id: this._getPizzaCategoryId(),
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
                  id: this._getPizzaId(),
                  name: pizzaName,
                  ingredients: pizzaIngredients,
                  prices: pizzaPrices,
                  category: finalPizzaCategory.id
                }

                res.pizzas.byId[finalPizza.id] = finalPizza
                res.pizzas.allIds.push(finalPizza.id)
              })
            })

            this.pizzas = res

            resolve(res)
          }
        })
    })
  }

  getUser(username) {
    if (!this.pizzas) {
      return null
    }

    const user = this.pizzas
      .users
      .allIds
      .map(userId => this.pizzas.users.byId[userId])
      .find(user => user.username === username)

    if (typeof user !== 'undefined' && user) {
      return user
    }

    return null
  }

  addUser(username) {
    return new Promise(solve => {
      const userId = this._getUserId()

      request(
        Object.assign({ url: `https://api.github.com/users/${username}` }, requestOptions),
        (error, response, body) => {
          if (error) {
            this.pizzas.users.byId[userId] = {
              id: userId,
              username,
              thumbnail: ''
            }
          } else {
            body = JSON.parse(body)
            const thumbnail = body['avatar_url'] || ''

            this.pizzas.users.byId[userId] = {
              id: userId,
              username,
              thumbnail
            }
          }

          this.pizzas.users.allIds.push(userId)

          solve(this.pizzas.users.byId[userId])
        })
    })
  }
}

module.exports = { Pizzas }
