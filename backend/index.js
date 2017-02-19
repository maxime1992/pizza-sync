const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const cors = require('cors')
const vorpal = require('vorpal')()
const bodyParser = require('body-parser')

const { AppController } = require('./controllers/app.controller')
const { PizzaDeLOrmeau } = require('./pizzas-providers/parse-pizza-de-l-ormeau')

const pizzaProvider = new PizzaDeLOrmeau()
const appCtrl = new AppController(pizzaProvider)

// ----------------------------------------------------------------------------

let isServerStarted = false

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

      socket.emit('SET_COUNTDOWN', {
        hour: appCtrl.getOrdersModel().getHourEnd(),
        minute: appCtrl.getOrdersModel().getMinuteEnd()
      })

      console.log({
        hour: appCtrl.getOrdersModel().getHourEnd(),
        minute: appCtrl.getOrdersModel().getMinuteEnd()
      })

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

    vorpal
      .command('countdown', 'Set or change when to stop the orders')
      .option('--hour <hour>', 'Set or change the hour when to block the orders')
      .option('--minute <minute>', 'Set or change the minute when to block the orders')
      .action((args, callback) => {
        if (!args.options.hour || !args.options.minute) {
          console.log('You need to define --hour and --minute')
          return callback()
        }

        if (typeof args.options.hour !== 'number' || typeof args.options.minute !== 'number') {
          console.log('"hour" and "minute" should be integers')
          return callback()
        }

        const hourEnd = parseInt(args.options.hour)
        const minuteEnd = parseInt(args.options.minute)

        if (hourEnd < 0 || hourEnd > 23) {
          console.log('"hour" must be between 0 and 23')
          return callback()
        }

        if (minuteEnd < 0 || minuteEnd > 59) {
          console.log('"minute" must be between 0 and 59')
          return callback()
        }

        if (args.options.hour) {
          console.log(args.options.hour)
          const hourEnd = parseInt(args.options.hour)
          appCtrl.getOrdersModel().setHourEnd(hourEnd)
        }

        if (args.options.minute) {
          console.log(args.options.minute)
          const hourMinute = parseInt(args.options.minute)
          appCtrl.getOrdersModel().setMinuteEnd(hourMinute)
        }

        io.sockets.emit('SET_COUNTDOWN', {
          hour: appCtrl.getOrdersModel().getHourEnd(),
          minute: appCtrl.getOrdersModel().getMinuteEnd()
        })

        if (!isServerStarted) {
          isServerStarted = true
          server.listen(3000)
        }

        callback()
      })

    vorpal
      .delimiter('pizza-sync$')
      .show();
  })

