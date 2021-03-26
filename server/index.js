var newRelic = require('newrelic'); // make new relic is at the top

const express = require('express')
const dbQueries = require('../database/dbQueries.js')
const { Client } = require('pg');
// const redis = require('redis')

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/products', dbQueries.getProducts)

// this one includes the features column as well - only difference than above
app.get('/products/:product_id', dbQueries.getProductsById)

app.get('/products/:product_id/styles', dbQueries.getProductStyles)

app.get('/products/:product_id/related', dbQueries.getRelatedProducts)

app.post('/loaderio-93bcca03e89fb74ba58ea822374e1e61/', function(req, res) {
  console.log(req.files.foo); // the uploaded file object
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})