const express = require('express')
const router = express.Router()
const { getAllPurchases } = require('../controllers/paymentController')

router.get('/purchases', getAllPurchases)
module.exports = router
