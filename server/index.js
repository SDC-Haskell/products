const express = require('express')
const connection = require('../database/postgresConfig.js')
const { Client } = require('pg');

const app = express()
const port = 3000

app.get('/products', connection.getProducts)

// this one includes the features column as well
app.get('/products/:product_id', connection.getProductsById)

app.get('products/:product_id/styles', connection.getProductStyles)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})