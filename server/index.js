var newRelic = require('newrelic'); // make new relic is at the top

const express = require('express')
// const dbQueries = require('../database/dbQueries.js')
// const { Client } = require('pg');

const app = express()
const port = 3000

// app.get('/products', dbQueries.getProducts)

// // this one includes the features column as well - only difference than above
// app.get('/products/:product_id', dbQueries.getProductsById)

// app.get('/products/:product_id/styles', dbQueries.getProductStyles)

// app.get('/products/:product_id/related', dbQueries.getRelatedProducts)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})