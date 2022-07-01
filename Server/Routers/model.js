const express = require('express')
const { addModel, removeModel } = require('../Controllers/modelControl')

const router = express.Router()

router.post('/',addModel)
router.delete('/:brandName/:modelName',removeModel)
module.exports = router
