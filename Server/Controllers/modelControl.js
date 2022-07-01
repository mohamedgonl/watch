const { findOneAndDelete, findOneAndUpdate, findById, findByIdAndUpdate, findByIdAndDelete } = require('../Models/Brand');
const Model = require('../Models/Model')
const Brand = require('../Models/Brand')

const addModel = async (req,res) => {
    try {
        const {brandName, modelName} = req.body;
        const newModel = new Model({name: modelName})
        await newModel.save()
        await Brand.findOneAndUpdate({
            name: brandName
        },
        {
            $push: {
                models: newModel._id
            }
        })

        res.status(200).json({
            msg: 'Add new model success',
            newModel: newModel
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Add new model error',
            error: err
        })
    }
}

const removeModel = async (req,res) => {
    try {
        const {brandName, modelName} = req.params;
        const brand = await Brand.findOne({name: brandName}).populate('models')
        var deletedModel = brand.models.filter(e => e.name == modelName) 

        if(deletedModel.length) {
            deletedModel = await Model.findByIdAndDelete(deletedModel[0]._id)
            await Brand.findByIdAndUpdate(brand._id,{
                $pullAll: {
                    models: [{_id: deletedModel._id}]
                }
            })
        }
        else deletedModel = null
        res.status(200).json({
            msg: 'Delete model success',
            deletedModel: deletedModel
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Delete model failed',
            error: err
        })
    }
}

module.exports = {addModel, removeModel}