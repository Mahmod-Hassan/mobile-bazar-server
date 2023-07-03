const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: String,
    verified: Boolean,
    userType: {
        type: String,
        default: 'buyer',
    }
})

module.exports = userSchema;