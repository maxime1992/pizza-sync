const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const { Pizzas } = require('./pizzas-api')

const pizzas = new Pizzas()

app.use(bodyParser.json())

app.use(cors())

app.get('/pizzas', (req, res) => {
  pizzas.getPizzas().then(pizzas => res.json(pizzas))
})

app.post('/orders', (req, res) => {
  const order = pizzas.addOrder(req.body)

  res.json(order)
})

app.post('/users', (req, res) => {
  const username = req.body.username
  pizzas.addUser(username).then(user => res.json(user))
})

app.listen(3000)
