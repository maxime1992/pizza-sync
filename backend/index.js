const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const cors = require('cors')
const bodyParser = require('body-parser')

const { AppController } = require('./controllers/app.controller')
const { PizzaDeLOrmeau } = require('./pizzas-providers/parse-pizza-de-l-ormeau')

const pizzaProvider = new PizzaDeLOrmeau()
const appCtrl = new AppController(pizzaProvider)

// ----------------------------------------------------------------------------

appCtrl
  .parsePizzaProvider()
  .then(_ => {
    app.use(bodyParser.json())

    const corsOptions = {
      credentials: false
    }
    app.use(cors(corsOptions))

    app.use(express.static('public'))

    app.get('/initial-state', (req, res) => {
      res.json(appCtrl.getInitialState())
    })

    io.sockets.on('connection', socket => {
      let currentUser = null

      socket.on('CONNECT_USER', username => {
        const user = appCtrl.getUsersModel().getUser(username)

        if (user) {
          appCtrl.getUsersModel().setUserOnline(user)

          currentUser = user
          io.sockets.emit('CONNECT_USER_SUCCESS', user)
        } else {

          appCtrl.getUsersModel().addUser(username).then(user => {
            appCtrl.getUsersModel().setUserOnline(user)
            currentUser = user
            io.sockets.emit('CONNECT_USER_SUCCESS', user)
          })
        }
      })

      socket.on('ADD_ORDER', orderWithoutId => {
        const order = appCtrl.getOrdersModel().addOrder(orderWithoutId)

        io.sockets.emit('ADD_ORDER_SUCCESS', order)
      })

      socket.on('REMOVE_ORDER', orderId => {
        if (appCtrl.getOrdersModel().removeOrder(orderId)) {
          io.sockets.emit('REMOVE_ORDER_SUCCESS', orderId)
        }
      })

      socket.on('disconnect', () => {
        if (currentUser === null) {
          return
        }
        appCtrl.getUsersModel().setUserOffline(currentUser)
        if (appCtrl.getUsersModel().getNbConnectionsUser(currentUser) === 0) {
          io.sockets.emit('DISCONNECT_USER_SUCCESS', currentUser.id)
        }
      })
    })

    server.listen(3000)
  })
