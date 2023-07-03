const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userSchema = require('../Schemas/userSchema');
const User = new mongoose.model("User", userSchema);


// get all seller and buyer by userType 
// go to the AllSeller or AllBuyer component to see this api
router.get('/', async(req,res) => {
   const user_type = req.query.type;
   const data = await User.find({userType: user_type});
   res.json(data);
})


// get single user by email
// go to the header, useSeller & useAdmin hooks to see this api
router.get('/:email', async (req,res) => {
   const email = req.params.email;
   const data = await User.findOne({email:email});
   res.json(data);
})


// delete user by id 
// go to the AllSeller or AllBuyer component to see this api
router.delete('/:id', async(req,res) => {
   const data = await User.deleteOne({_id: req.params.id});
   res.json(data);
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

  // set the role admin when an admin click the make admin button
   // go to the all seller component to see this api
   router.put('/make-admin/:id', async (req, res) => {
   try {
      console.log(req.params.id);
      const filter = { _id: req.params.id };
      const options = { upsert: true };
      const updateDoc = {
            $set: {
               role: 'admin'
            }
      };
      const results = await User.updateOne(filter, updateDoc, options);
      res.json(results);
   }
   catch {
      res.status(500).send({'error': 'make admin error'})
   }
  
})

  // set the role admin when an admin click the make admin button
   // go to the all seller component to see this api
   router.put('/verify-seller/:id', async (req, res) => {
      const filter = { _id: req.params.id };
      const options = { upsert: true };
      const updateDoc = {
            $set: {
               verified: true
            }
      };
      const results = await User.updateOne(filter, updateDoc, options);
      res.json(results);
   })

     // If a user register / googleSignIn/ Login then he will be given a token
     router.get('/send-token/:email', async (req, res) => {
         const email = req.params.email;
         const user = await User.findOne({ email: email});
         if (user) {
            const token = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            return res.send({ accessToken: token });
         }
         else{
            res.status(403).send({accessToken : "no token"})
            }
      
  })

module.exports = router;