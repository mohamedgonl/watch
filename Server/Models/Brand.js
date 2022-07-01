const mongoose = require('mongoose')


const Brand = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    models: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Model'
        }
    ]
}, {collection: 'Brand'})

module.exports = mongoose.model('Brand', Brand)