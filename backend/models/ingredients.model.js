const { cleanIngredientName } = require('../helpers/string.helper')

class IngredientsModel {
  constructor() {
    this._byId = {}
    this._allIds = []

  }

  static getNewId() {
    return `ingredientId${IngredientsModel._id++}`
  }

  static registerIfNewAndGetId(ingredientName) {
    ingredientName = cleanIngredientName(ingredientName)

    if (IngredientsModel._ingredientsMap.has(ingredientName)) {
      return IngredientsModel._ingredientsMap.get(ingredientName).id
    }

    const newId = IngredientsModel.getNewId()

    IngredientsModel._ingredientsMap.set(ingredientName, { id: newId, name: ingredientName })

    return newId
  }

  static getIngredients() {
    return Array.from(IngredientsModel._ingredientsMap.values())
  }

  setNormalizedData({ byId, allIds }) {
    this._byId = byId
    this._allIds = allIds
  }

  getNormalizedData() {
    return {
      byId: this._byId,
      allIds: this._allIds
    }
  }
}

IngredientsModel._id = 0
IngredientsModel._ingredientsMap = new Map()

module.exports = { IngredientsModel }
