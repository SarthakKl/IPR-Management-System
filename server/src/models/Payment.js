const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    order_id:String, 
    payment_id:String,
    payment_signature:String
})

const model = mongoose.model('Payment', paymentSchema)

module.exports = model