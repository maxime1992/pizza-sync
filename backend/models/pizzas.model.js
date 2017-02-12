class PizzasModel {
  constructor() {
    this._byId = {}
    this._allIds = []
  }

  static getNewId() {
    return `pizzaId${PizzasModel._id++}`
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

PizzasModel._id = 0

module.exports = { PizzasModel }
