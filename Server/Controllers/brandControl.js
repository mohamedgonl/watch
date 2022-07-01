const { findOneAndDelete } = require('../Models/Brand');
const Brand = require('../Models/Brand')


const addBrand = async (req,res) => {
    try {
        const {name} = req.body;
        const newBrand = new Brand({name: name})
        await newBrand.save()
        res.status(200).json({
            msg: 'Add new brand success',
            newBrand: newBrand
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Add new brand error',
            error: err
        })
    }
}

const removeBrand = async (req,res) => {
    try {
        const {name} = req.params;
        const deletedBrand = await Brand.deleteMany({name: name})
        res.status(200).json({
            msg: 'Delete brand success',
            deletedBrand: deletedBrand
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Delete brand failed',
            error: err
        })
    }
}

module.exports = {addBrand, removeBrand}