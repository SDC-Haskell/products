const db = require('./postgresConfig.js')

const getProducts = function (req, res) {

  let count = 5;
  let page = 1;

  if (req.query.count) {
    count = Number(req.query.count)
  }
  if (req.query.page) {
    page = Number(req.query.page)
  }

  let start = (page - 1) * count
  let query = `select * from products where product_id > ${start} limit ${count}`

  db.query(query)
  .then((results) => {
    res.send(results.rows)
  })
  .catch((error) => {
    res.send(error)
  })
}

const getProductsById = function (req, res) {
  let id = Number(req.params.product_id)
  let featuresQuery = `SELECT
  features.feature,
  features.attribute
  FROM products
  INNER JOIN features ON products.product_id=features.product_id
  where (products.product_id = ${id});`;

  let productsQuery = `SELECT * from products where product_id=${id}`

  db.query(featuresQuery)
  .then((data) => {
    db.query(productsQuery)
    .then((data2) => {
      let featuresArray = data.rows
      data2.rows[0]['features'] = featuresArray
      res.send(data2.rows)
    })
  })
  .catch((error) => {
    res.send(error)
  })
}

const getProductStyles = function (req, res) {
  let id = Number(req.params.product_id)
  let skusQuery = `SELECT
  style_skus.id,
  style_skus.size,
  style_skus.quantity,
  styles.style_id
  FROM styles
  INNER JOIN style_skus ON styles.style_id=style_skus.style_id
  WHERE (styles.product_id = ${id})`;
  let stylesQuery = `select * from styles where product_id=${id}`

  db.query(skusQuery)
  .then((skusData) => {
    let skusArray = skusData.rows

    db.query(stylesQuery)
    .then((stylesData) => {
      debugger;
      let stylesArray = stylesData.rows
      stylesArray.forEach((style) => {
        let skusObject = {}
        skusArray.forEach((sku) => {
          if (sku.style_id === style.style_id) {
            skusObject[sku.id] = {quantity: sku.quantity, size: sku.size}
          }
        })
        style["skus"] = skusObject
      })

      // db.query(photosQuery)
      // .then((photosData) => {
      //   let photosArray

      // })

      res.send(stylesArray)
    })
  })
}


module.exports = {
  getProducts,
  getProductsById,
  getProductStyles
}