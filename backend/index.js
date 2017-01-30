const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const cors = require('cors')
const bodyParser = require('body-parser')

const { Pizzas } = require('./pizzas-api')

const pizzas = new Pizzas()

app.use(bodyParser.json())

const corsOptions = {
  credentials: false
}
app.use(cors(corsOptions))

app.use(express.static('public'))

app.get('/pizzas', (req, res) => {
  pizzas.getPizzas().then(pizzas => res.json(pizzas))
})

app.post('/users', (req, res) => {
  const username = req.body.username
  pizzas.addUser(username).then(user => {
    res.json(user)
    io.sockets.emit('USER_CONNECTED', user)
  })
})

app.get('/users/:username', (req, res) => {
  const username = req.params.username

  const user = pizzas.getUser(username)

  res.json(user)
})

server.listen(3000)

io.on('connection', socket => {
  socket.on('ADD_ORDER', orderWithoutId => {
    const order = pizzas.addOrder(orderWithoutId)

    io.sockets.emit('ADD_ORDER', order)
  })

  socket.on('REMOVE_ORDER', orderId => {
    if (pizzas.removeOrder(orderId)) {
      io.sockets.emit('REMOVE_ORDER', orderId)
    }
  })
})
