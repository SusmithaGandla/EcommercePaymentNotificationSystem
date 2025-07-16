const express = require('express')
const router = express.Router()
const { makePayment, getAllPurchases } = require('../controllers/paymentController')

router.post('/', makePayment)
router.get('/purchases',getAllPurchases)
module.exports = router

