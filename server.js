const express = require('express');
const app = express();
require('dotenv').config()

// DB-connected
const knex = require('./DB/db')

const bodyParser = require('body-parser');
// app.use(express.join())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./Routes/rout'))

// Get Welcome 
app.get('/', (req, res) => {
    res.send('Welcome to My World..')
})

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    let host = server.address().address
    let port = server.address().port
    console.log(host, port);
    console.log('Server is running successfully....');

})