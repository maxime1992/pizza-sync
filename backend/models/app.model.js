// models are singleton
// create them once and access them from AppModel getters
const { PizzasModel } = require('./pizzas.model')
const { PizzasCategoriesModel } = require('./pizzas-categories.model')
const { OrdersModel } = require('./orders.model')
const { UsersModel } = require('./users.model')
const { IngredientsModel } = require('./ingredients.model')

class AppModel {
  constructor() {
    this._pizzasMdl = new PizzasModel()
    this._pizzasCategoriesMdl = new PizzasCategoriesModel()
    this._ordersMdl = new OrdersModel()
    this._usersMdl = new UsersModel()
    this._ingredientsMdl = new IngredientsModel()
  }

  getInitialState() {
    return {
      pizzas: this._pizzasMdl.getNormalizedData(),
      pizzasCategories: this._pizzasCategoriesMdl.getNormalizedData(),
      users: this._usersMdl.getNormalizedData(),
      orders: this._ordersMdl.getNormalizedData(),
      ingredients: this._ingredientsMdl.getNormalizedData()
    }
  }

  getPizzasModel() {
    return this._pizzasMdl
  }

  getPizzasCategoriesModel() {
    return this._pizzasCategoriesMdl
  }

  getOrdersModel() {
    return this._ordersMdl
  }

  getUsersModel() {
    return this._usersMdl
  }

  getIngredientsModel() {
    return this._ingredientsMdl
  }
}

module.exports = { AppModel }
