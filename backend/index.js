const express = require('express')
const app = express()

const { getPizzas } = require('./pizzas-api')

app.get('/pizzas', (req, res) => {
  getPizzas().then(pizzas => res.json(pizzas))
})

app.listen(3000)
