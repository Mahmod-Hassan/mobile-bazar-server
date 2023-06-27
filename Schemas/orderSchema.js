const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    buyer_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true
    },
    resale_price: Number,
    photoUrl: String,
    buyer_location: {
        type: String,
        required: true
    },
    number: Number,
})

module.exports = orderSchema;