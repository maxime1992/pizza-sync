class OrdersModel {
  constructor() {
    this._byId = {}
    this._allIds = []
  }

  static getNewId() {
    return `orderId${OrdersModel._id++}`
  }

  getNormalizedData() {
    return {
      byId: this._byId,
      allIds: this._allIds
    }
  }

  addOrder(order) {
    const orderId = OrdersModel.getNewId()

    this._byId[orderId] = order
    this._byId[orderId].id = orderId

    this._allIds.push(orderId)

    return this._byId[orderId]
  }

  removeOrder(orderId) {
    if (typeof this._byId[orderId] === 'undefined') {
      return false
    }

    delete this._byId[orderId]

    this._allIds = this._allIds.filter(orderIdTmp => orderIdTmp !== orderId)
    return true
  }
}

OrdersModel._id = 0

module.exports = { OrdersModel }
