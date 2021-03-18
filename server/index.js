const express = require('express')
const connection = require('../database/postgresConfig.js')

const app = express()
const port = 3000

app.get('/products', connection.getFirstFive)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})