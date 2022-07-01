
const { findOne, findByIdAndUpdate, findOneAndDelete } = require('../Models/Watch');
const Watch = require('../Models/Watch')
const Brand = require('../Models/Brand');
const Model = require('../Models/Model');


const addWatch = async (req, res) => {
    try {
        const {brandName, modelName, watchInfo} = req.body;
        const newWatch = new Watch({...watchInfo})
        const brand = await Brand.findOne({
            name: brandName
        }).populate('models')    
        if(brand) {
            var models = brand.models.filter(e => e.name == modelName)     
            if(models.length) {   
              
                const model = await Model.findByIdAndUpdate(models[0]._id,{
                    $push: {
                        watches: newWatch._id
                    }
                }) 
                await newWatch.save()
                res.status(200).json({
                    msg: 'Add new watch success',
                    newWatch: newWatch
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
            msg: 'Add new watch failed',
            error: err
        })
    }
}

const removeWatch = async (req,res) => {
    try {
        const {brandName, modelName, serial} = req.params
        const brand = await Brand.findOne({
            name: brandName
        }).populate('models')    
        if(brand) {
            var models = brand.models.filter(e => e.name == modelName)
            if(models.length) {   
                const model = await Model.findById(models[0]._id).populate('watches')
                const watches = model.watches.filter(e => e.serial == serial)
                if(watches.length) {
                    const watch = watches[0];
                    await Model.findByIdAndUpdate(model._id, {
                        $pullAll: {
                            watches: [{_id: watch._id}]
                        }
                    })
                    await Watch.findByIdAndDelete(watch._id)
                    res.status(200).json({
                        msg: 'Delete watch success',
                        deletedWatch: watch
                    })
                }
                else
                res.status(201).json({
                    msg: 'No such a serial'
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
            msg: 'Delete watch failed',
            error: err
        })
    }
}

module.exports = {addWatch, removeWatch}