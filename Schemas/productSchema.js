const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    email: String,
    photoUrl: String,
    sellerName: String,
    productName: String,
    originalPrice: String,
    resalePrice: String,
    condition: String,
    category: String,
    description: String,
    using: String,
    date: Date,
    booked: String,
    location: String,
})

module.exports = productSchema;