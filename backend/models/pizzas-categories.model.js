class PizzasCategoriesModel {
  constructor() {
    this._byId = {}
    this._allIds = []
  }

  static getNewId() {
    return `pizzaCategoryId${PizzasCategoriesModel._id++}`
  }

  setNormalizedData({ byId, allIds}) {
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

PizzasCategoriesModel._id = 0

module.exports = { PizzasCategoriesModel }
