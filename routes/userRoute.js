const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const userSchema = require('../Schemas/userSchema');
const User = new mongoose.model("User", userSchema);

// get single user
router.get('/', async (req,res) => {

})

// post and upadate user
router.put('/', async (req,res) => {
   const user = req.body;
   const email = req.query.email;
   const filter = {email: email};
   const options = { upsert: true };
   const data = await User.updateOne(filter,{ $set:user},options)
   res.json(data);
})

module.exports = router;