const express = require('express')
const app = express()
const cors = require('cors')

const { getPizzas } = require('./pizzas-api')

app.use(cors())

app.get('/pizzas', (req, res) => {
  getPizzas().then(pizzas => res.json(pizzas))
})

app.listen(3000)
