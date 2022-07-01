const express = require('express')
const { addWatch, removeWatch } = require('../Controllers/watchControl')

const router = express.Router()

router.post('/',addWatch)
router.delete('/:brandName/:modelName/:serial',removeWatch)
module.exports = router

