const request = require('request')

const { requestOptions } = require('../helpers/http.helper')

class UsersModel {
  constructor() {
    this._byId = {}
    this._allIds = []
  }

  static getNewId() {
    return `userId${UsersModel._id++}`
  }

  getNormalizedData() {
    return {
      byId: this._byId,
      allIds: this._allIds
    }
  }

  // TODO : might be refactored and improved by using username as ID
  // it would avoid to go through the array with a `find` and allow
  // us to access to the object in a more efficient way
  getUser(username) {
    const user = this
      ._allIds
      .map(userId => this._byId[userId])
      .find(user => user.username === username)

    if (user) {
      return user
    }

    return null
  }

  getNbConnectionsUser(user) {
    if (typeof this._byId[user.id] !== 'undefined') {
      return this._byId[user.id].nbConnections
    }

    return 0
  }

  getNbConnections() {
    return this._allIds.length;
  }

  addUser(username) {
    return new Promise((resolve, reject) => {
      const userId = UsersModel.getNewId()

      request(
        Object.assign({ url: `https://api.github.com/users/${username}` }, requestOptions),
        (error, response, body) => {
          if (error) {
            this._byId[userId] = {
              id: userId,
              username,
              thumbnail: '',
              nbConnections: 0
            }
          } else {
            let thumbnail = ''

            try {
              body = JSON.parse(body)
              thumbnail = body['avatar_url'] || ''
            } catch (e) {
              thumbnail = ''
            }

            this._byId[userId] = {
              id: userId,
              username,
              thumbnail,
              nbConnections: 0
            }
          }

          this._allIds.push(userId)

          resolve(this._byId[userId])
        })
    })
  }

  setUserOnline(user) {
    this._byId[user.id].isOnline = true
    this._byId[user.id].nbConnections++
  }

  setUserOffline(user) {
    this._byId[user.id].isOnline = false
    this._byId[user.id].nbConnections--
  }
}

UsersModel._id = 0

module.exports = { UsersModel }
