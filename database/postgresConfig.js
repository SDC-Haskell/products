const { Client } = require('pg');

const config = {
  host: 'localhost',
  user: 'darian1',
  password: 'password',
  database: 'allproducts',
  port: 5432
}

const client = new Client(config);

const connection = client.connect();

const getFirstFive = function (req, res) {

  let count = 5;
  let page = 1;

  connection.query(`select * from products limit 5`, (error,result) => {
    res.send(result)
  })
}


module.exports = {
  connection,
  getFirstFive
}


// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })
