const { Client } = require('pg');

const config = {
  host: '172.31.43.247', // put the private ip here instead
  user: 'postgres',
  password: 'password',
  database: 'allproducts',
  port: 5432
}

module.exports = client = new Client(config);

client.connect().then(()=> console.log("db connected and good to go"))
