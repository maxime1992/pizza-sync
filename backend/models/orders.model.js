class OrdersModel {
  constructor() {
    // when the app should stop accepting orders
    this.hourEnd = null
    this.minuteEnd = null

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

  getHourEnd() {
    return this.hourEnd
  }

  getMinuteEnd() {
    return this.minuteEnd
  }

  setHourEnd(hourEnd) {
    this.hourEnd = hourEnd
  }

  setMinuteEnd(minuteEnd) {
    this.minuteEnd = minuteEnd
  }
}

OrdersModel._id = 0

module.exports = { OrdersModel }
