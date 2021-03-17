const { Client } = require('pg');

const config = {
  host: 'localhost',
  user: 'root',
  database: 'allproducts',
  // port: 5432
}

const client = new Client(config);


client.connect((err) => {
  if (err) {
    console.log("not working")
  }
})

module.exports = {
  client
}

// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })
