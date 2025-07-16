// const stripe = require("stripe")("sk_test_51Rl9DyRufBiWkWcQPwv2QdCISGaS5RIbXLDbOK43wvCZ4JsBlMPRNQ0R2v1YkniMUV9OMSs6sWeoS2hJfnFBKVV700QqXBX6Vm")
const nodemailer = require("nodemailer")
const Purchase = require("../models/purchase")

const EMAIL_USER = "susmithadevigandla@gmail.com"
const EMAIL_PASS = "bggr arod iryz jacq"
const SUPER_ADMIN_EMAIL = "susmitha2735@gmail.com"

const makePayment = async (req, res) => {
  const { product, amount, userEmail, userName } = req.body

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: { name: product },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000',
    })

    await Purchase.create({ product, amount, userEmail, userName })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: EMAIL_USER,
      to: SUPER_ADMIN_EMAIL,
      subject: `Payment Received for ${product}`,
      html: `<p><strong>${userName}</strong> (${userEmail}) paid <strong>Rs ${amount}</strong> for <strong>${product}</strong>.</p>`,
    })

    res.status(200).json({ url: session.url })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllPurchases = async (req, res) => {
  const { adminEmail } = req.query
  if (adminEmail !== SUPER_ADMIN_EMAIL) {
    console.log("Rejected adminEmail:", adminEmail)
    return res.status(403).json({ error: 'Unauthorized' })
  }
  try {
    const purchases = await Purchase.find().sort({ createdAt: -1 })
    res.json(purchases)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { makePayment, getAllPurchases }
