const mongoose = require('mongoose')


const Model = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    brand: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Brand'
    },
    watches: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Watch'
        }
    ]
}, {collection: 'Model'})

module.exports = mongoose.model('Model', Model)