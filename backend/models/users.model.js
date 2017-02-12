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

  getUser(username) {
    if (typeof this._byId[username] !== 'undefined') {
      return this._byId[username]
    }

    return null
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
              thumbnail: ''
            }
          } else {
            body = JSON.parse(body)
            const thumbnail = body['avatar_url'] || ''

            this._byId[userId] = {
              id: userId,
              username,
              thumbnail
            }
          }

          this._allIds.push(userId)

          resolve(this._byId[userId])
        })
    })
  }
}

UsersModel._id = 0

module.exports = { UsersModel }
