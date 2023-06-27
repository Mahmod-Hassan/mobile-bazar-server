const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: String,
    sellerName: String,
    productName: String,
    orignialPrice: String,
    resalePrice: String,
    condition: String,
    category: String,
    description: String,
    using: String,
    date: Date,
    booked: String,
})

module.exports = productSchema;