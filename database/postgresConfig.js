const { Client } = require('pg');

const config = {
  host: '127.0.0.1',
  user: 'darian1',
  password: 'password',
  database: 'allproducts',
  port: 5432
}

module.exports = client = new Client(config);

client.connect().then(()=> console.log("db connected and good to go"))
