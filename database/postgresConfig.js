const { Client } = require('pg');

const config = {
  host: 'localhost',
  user: 'darian1',
  password: 'password',
  database: 'allproducts',
  port: 5432
}

const client = new Client(config);

client.connect().then(()=> console.log("db connected and good to go"))

const getProducts = function (req, res) {
  // req.query is an object with {count:"1", page:"2"}
  // starting page for product is 17067. set 1 = 17067?

  let count = 5;
  let page = 1;
  // if page = 1 and count 5, start at item 1
  // if page = 2 and count 5, start at item 6
  // if page = 3 and count 5, start at item 11

  if (req.query.count) {
    count = Number(req.query.count)
  }
  if (req.query.page) {
    page = Number(req.query.page)
  }

  let start = (page - 1) * count
  debugger;

  client.query(`select * from products where product_id > ${start} limit ${count}`, (error, results) => {
    if (error) {
      res.send(error)
    } else {
      res.send(results.rows)
    }
  })

  // client.query(`select * from products where product_id between ${(page*count)-4} and ${page + count - 1}`, (error, results) => {
  //   if (error) {
  //     res.send(error)
  //   } else {
  //     res.send(results.rows)
  //   }
  // })
}

// let featuresQuery = `SELECT
// features.feature,
// features.attribute
// FROM products
// INNER JOIN features ON products.product_id=features.product_id
// where (products.product_id = ${id});`

const getProductsById = function (req, res) {
  let id = Number(req.params.product_id)
  let featuresQuery = `SELECT
  features.feature,
  features.attribute
  FROM products
  INNER JOIN features ON products.product_id=features.product_id
  where (products.product_id = ${id});`;

  let productsQuery = `SELECT * from products where product_id=${id}`

  client.query(featuresQuery)
  .then((data) => {
    client.query(productsQuery)
    .then((data2) => {
      let featuresArray = []
      data.rows.forEach((feature) => {
        let featuresObject = {}
        featuresObject["feature"] = feature.feature;
        featuresObject["attribute"] = feature.attribute
        featuresArray.push(featuresObject)
      })
      let cleanData = data2.rows[0]
      let resultObject = {product_id: cleanData.product_id, product_name:cleanData.product_name, slogan:cleanData.slogan, product_description:cleanData.product_description, category:cleanData.category, default_price:cleanData.default_price, features: featuresArray}
      res.send(resultObject)
    })
  })
}

module.exports = {
  getProducts,
  getProductsById
}


// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })
