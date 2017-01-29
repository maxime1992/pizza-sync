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

app.post('/orders', (req, res) => {
  const order = pizzas.addOrder(req.body)

  res.json(order)
})

app.post('/users', (req, res) => {
  const username = req.body.username
  pizzas.addUser(username).then(user => {
    res.json(user)
    io.sockets.emit('USER_CONNECTED', user)
  })
})

server.listen(3000)

io.on('connection', socket => {
  socket.on('ADD_ORDER', orderWithoutId => {
    const order = pizzas.addOrder(orderWithoutId)

    io.sockets.emit('ADD_ORDER', order)
  })
})
