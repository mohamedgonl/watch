const mongoose = require('mongoose')


const Watch = mongoose.Schema({
    serial: {
        type: String,
        default: ''
    },
    year : {
        type: Number,
        default: 0
    },
    model: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Model'
    },
    waterResistance: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        default: 0,
    },
    rate: {
        type: Object,
        default : {
            rates: {
                type: Int8Array,
                default: []
            },
            average: {
                type: Number,
                default: null
            }
        }
    }
}, {collection: 'Watch'})

module.exports = mongoose.model('Watch', Watch)