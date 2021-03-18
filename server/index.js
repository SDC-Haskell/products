const express = require('express')
const connection = require('../database/postgresConfig.js')
const { Client } = require('pg');

const app = express()
const port = 3000

app.get('/products', connection.getProducts)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})