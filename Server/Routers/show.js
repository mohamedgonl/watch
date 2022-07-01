const express = require('express')
const { showAllWatches, searchbyBrandandModel, showMaxRate } = require('../Controllers/showControl')

const router = express.Router()

router.get('/allwatches', showAllWatches)
router.get('/search',searchbyBrandandModel)
router.get('/maxrate/:num',showMaxRate)

module.exports = router
