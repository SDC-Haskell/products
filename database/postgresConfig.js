const { Client } = require('pg');

const config = {
  host: 'localhost',
  user: 'darian1',
  password: 'password',
  database: 'allproducts',
  port: 5432
}

const client = new Client(config);

client.connect().then(()=> console.log("connected"))

const getProducts = function (req, res) {
  // req.query is an object with {count:"1", page:"2"}
  // starting page for product is 17067. set 1 = 17067?

  let count = 5;
  let page = 1;
  // if page = 2, start at item 6
  // if page = 3, start at item 11

  if (req.query.count) {
    count = Number(req.query.count)
  }
  if (req.query.page) {
    page = Number(req.query.page)
  }

  // client.query(`select * from products limit ${count}`, (error, results) => {
  //   res.send(results)
  // })

  client.query(`select * from products where product_id between ${page} and ${page + count - 1}`, (error, results) => {
    if (error) {
      res.send(error)
    } else {
      res.send(results.rows)
    }
  })
}


module.exports = {
  getProducts
}


// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })
