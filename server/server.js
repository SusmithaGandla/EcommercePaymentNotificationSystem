const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const paymentRoutes = require('./routes/payment')
const adminRoutes = require('./routes/admin')
app.use('/api/payment', paymentRoutes)
app.use('/api/admin', adminRoutes)

const MONGO_URI = "mongodb://127.0.0.1:27017/ecommerce"

mongoose.connect(MONGO_URI).then(() => {
  app.listen(5000, () => {
    console.log("Server running on port 5000")
  })
})
