const { Client } = require('pg');

const config = {
  host: '172.31.36.112', // put the private ip of the db instance here instead
  user: 'postgres',
  password: 'password',
  database: 'allproducts',
  port: 5432
}

module.exports = client = new Client(config);

client.connect().then(()=> console.log("db connected and good to go"))
