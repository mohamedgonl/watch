const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
const brand = require('../Server/Routers/brand')
const model = require('../Server/Routers/model')
const watch = require('../Server/Routers/watch')
const show = require('../Server/Routers/show')
const connection = require('./connection')
app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}))


const corsOpts = {
    origin: '*',
    methods: [
        'GET', 'POST', 'PUT', 'DELETE'
    ],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOpts));

// routing
app.use('/brand', brand)
app.use('/model', model)
app.use('/watch', watch)
app.use('/show', show)


// connect database
 connection()

app.get('/', (req, res) => {
    res.send('SUCCESS')
})
app.listen(process.env.PORT || 5000, ()=>{
});






