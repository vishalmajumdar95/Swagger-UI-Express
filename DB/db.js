const mysql = require('mysql')
require('dotenv').config()

const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_N,
    password: process.env.PASSWORD,
})

conn.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log("Connected DB successfully..");
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.HOST,
        user: process.env.USER_N,
        password: process.env.PASSWORD,
        database: process.env.DB_NAME
    }
})

knex.schema.createTable('users', (table) => {
        table.increments("id").primary()
        table.string('name')
        table.string('email')
        table.string('password')

    })
    .then((data) => {
        console.log(`tables Created`);
    })
    .catch((er) => {
        console.log(`tables already exists !`);
    })
module.exports = knex;