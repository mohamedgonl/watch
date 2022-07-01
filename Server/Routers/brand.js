const express = require('express')
const { addBrand, removeBrand } = require('../Controllers/brandControl')

const router = express.Router()

router.post('/',addBrand)
router.delete('/:name',removeBrand)
module.exports = router
