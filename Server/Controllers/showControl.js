
const Watch = require('../Models/Watch')
const Brand = require('../Models/Brand')
const Model = require('../Models/Model')

const showAllWatches = async (req, res) => {
    try {
        const watches = await Watch.find();
        res.status(200).json({
            msg: 'Get all watches success',
            watches: watches
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Get all watches failed',
            error: err
        })
    }
}

const searchbyBrandandModel = async (req,res) => {
    try {
        const {brand, model} = req.query;
        var _brand = await Brand.find().populate({path: 'models', populate : { path: 'watches'}})
        _brand = _brand.filter(e => e.name.toLowerCase() == brand.toLowerCase())  
        if(_brand.length) {
            var models = _brand[0].models
            models = models.filter(e => e.name.toLowerCase() == model.toLowerCase())
            if(models.length) {   
                var watches = models[0].watches;
                res.status(200).json({
                    msg: 'Search watches success',
                    watches: watches
                })
            }
            else res.status(201).json({
                msg: 'No such a model'
            })
         }
        else {
            res.status(201).json({
                msg: 'No such a brand'
            })
        }
    } catch (err) {
        res.status(500).json({
            msg: 'Search failed',
            error: err
        })
    }
}

const showMaxRate = async (req, res) => {
    try {
        const {num} = req.params
        console.log(num);
        let watches = await Watch.find({})
        watches = watches.sort((a,b) => {
            if(a.rate.average > b.rate.average) return 1;
            if(a.rate.average < b.rate.average) return -1;
            return 0;
        })
        watches = watches.slice(-num)
        res.status(200).json({
            msg: 'Get max rate success',
            watches: watches
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Get max rate failed',
            error: err
        })
    }
}
module.exports = {showAllWatches, searchbyBrandandModel, showMaxRate}