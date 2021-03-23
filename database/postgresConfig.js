const { Client } = require('pg');

const config = {
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'allproducts',
  port: 5432
}

module.exports = client = new Client(config);

client.connect().then(()=> console.log("db connected and good to go"))
