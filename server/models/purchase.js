const mongoose = require('mongoose')
const PurchaseSchema = new mongoose.Schema({
  product: String,
  amount: Number,
  userEmail: String,
  userName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model('Purchase', PurchaseSchema)
