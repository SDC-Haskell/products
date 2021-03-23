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

  // make query for the products data
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

  // make query for the features data
  db.query(featuresQuery)
  .then((data) => {

    // make query for the products data
    db.query(productsQuery)
    .then((data2) => {
      let featuresArray = data.rows
      // if there is no features data, then just send back the products data
      if (featuresArray.length === 0) {
        res.send(data2.rows)
      }
      // combine the features data with products data and send result back
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

  let stylesQuery = `select * from styles where product_id=${id}`;

  let photosQuery = `SELECT
  style_photos.id,
  style_photos.large_url,
  style_photos.thumbnail_url,
  styles.style_id
  FROM styles
  INNER JOIN style_photos ON styles.style_id=style_photos.style_id
  WHERE (styles.product_id = ${id})`;

  const stylesPromise = db.query(stylesQuery)
  const skusPromise = db.query(skusQuery)
  const photosPromise = db.query(photosQuery)

  Promise.all([stylesPromise, skusPromise, photosPromise])
  .then(([styles, skus, photos]) => {
    let stylesArray = styles.rows;
    let skusArray = skus.rows;
    let photosArray = photos.rows;

    stylesArray.forEach((style) => {
      let skusObject = {}
      let photosResult = []

      skusArray.forEach((sku) => {
        if (sku.style_id === style.style_id) {
          skusObject[sku.id] = {quantity: sku.quantity, size: sku.size}
        }
      })

      photosArray.forEach((photo) => {
        if (photo.style_id === style.style_id) {
          photosResult.push(photo)
        }
      })
      style["skus"] = skusObject
      style["photos"] = photosResult
    })
    let results = {product_id: id, results: stylesArray}
    res.send(results)
  })

  /*
  // query skus data
  db.query(skusQuery)
  .then((skusData) => {
    let skusArray = skusData.rows

    // query styles data
    db.query(stylesQuery)
    .then((stylesData) => {
      let stylesArray = stylesData.rows

      // iterate over each style
      stylesArray.forEach((style) => {
        let skusObject = {}
        let photosResult = []

        // iterate over each sku
        skusArray.forEach((sku) => {
          if (sku.style_id === style.style_id) {
            skusObject[sku.id] = {quantity: sku.quantity, size: sku.size}
          }
        })
        db.query(photosQuery)
        .then((photosData) => {
          let photosArray = photosData.rows
          photosArray.forEach((photo) => {
            if (photo.style_id === style.style_id) {
              photosResult.push(photo)
            }
          })
          style["skus"] = skusObject
          style["photos"] = photosResult
          res.send(stylesArray)

        })
      })
    })
  })
  .catch((error) => {
    res.send(error)
  }) */
}

const getRelatedProducts = function(req, res) {
  let id = Number(req.params.product_id)

  let query = `SELECT
  related_products.id,
  related_products.current_product_id,
  related_products.related_product_id,
  products.product_id
  FROM products
  INNER JOIN related_products ON products.product_id=related_products.current_product_id
  WHERE (products.product_id = ${id})`


  // make query for related products data
  db.query(query)
  .then((relatedData) => {
    let results = []
    let relatedProductsArray = relatedData.rows
    // iterate throught the array of objects and get the related product id's into an array
    relatedProductsArray.forEach((relatedProduct) => {
      results.push(relatedProduct.related_product_id)
    })
    res.send(results)
  })
}




module.exports = {
  getProducts,
  getProductsById,
  getProductStyles,
  getRelatedProducts
}