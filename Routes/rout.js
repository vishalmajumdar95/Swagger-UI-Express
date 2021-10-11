const express = require('express')
const router = express.Router()
const knex = require('../DB/db')

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../Swagger/swagger.json');
const swaggerOptions = {
    swaggerOptions: {
        validatorUrl: null
    },
    customCss: '.swagger-ui .topbar { display: none }'
};

// Swagger API-docs
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
router.use(express.json())

// Get Hello World
router.get('/hello', (req, res) => {
    res.json({ message: "hello brother !" })
})

// Get User dataView
router.get('/users', (req, res) => {
    knex.select("*")
        .from('users')
        .then((data) => {
            res.json({ users: data })
        })
        .catch((er) =>
            res.json({ errMessage: er }))

});

// Get User dataView by id
router.get('/users/:id', (req, res) => {
    knex.select("*")
        .from('users')
        .where('id', req.params.id)
        .then((data) => {
            res.json({ user: data })
        })
        .catch((er) =>
            res.json({ errMessage: er }))
});

// Post the userdata
router.post('/post', async(req, res) => {
    console.log(req.query);

    const userdata = await {
        name: req.query.name,
        email: req.query.email,
        password: req.query.password
    }

    knex('users').insert(userdata)
        .then((data) => {
            console.log(data);
            res.send("user  created successfully")
        })
        .catch((er) => {
            console.log(er);
            res.json({ "message": er })
        });
})

// put update userdata by id 
router.put('/update/:id', (req, res) => {
    // res.send(req.params.id)
    knex('users').
    where('id', req.params.id)
        .update({
            id: req.params.id,
            name: req.query.name,
            email: req.query.email,
            password: req.query.password
        })
        .then((data) => {
            console.log(data);
            res.send("updated successfully")
        })
        .catch((er) => {
            console.log(er);
            res.json({ "message": er })
        });
})

// delete userdata
router.delete('/delete/:id', (req, res) => {
    knex('users')
        .where('id', req.params.id)
        .del()
        .then((data) => {
            console.log(data);
            res.send("deleted successfully")
        })
        .catch((er) => {
            console.log(er);
            res.json({ "message": er })
        });
})
module.exports = router;