const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const productSchema = require('../Schemas/productSchema');
const Product = new mongoose.model("Product", productSchema);
const verifyToken = require('../middlewares/verifyToken');

// post a product to database
// go the AddProduct component to see this api
router.post('/', async (req, res) => {
   try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send({
        data: result,
        message: 'you successfully post your product'
    });
   }
   catch {
    res.status(500).send('something went wrong')
   }
})

// get product category wise
// go to the GetProductsById component to see this api
router.get('/category', async (req,res) => {
    const data = await Product.find({category: req.query.category});
    res.json(data)
})

// get product by current user email
// go to the MyProducts component to see this api
router.get('/my', verifyToken, async (req,res) => {
    const decodedEmail = req.decoded.email;
    const email = req.query.email;
    if(email !== decodedEmail){
        res.status(401).send({message: 'forbidden access'})
    }
    else{
        const data = await Product.find({email: email});
        res.json(data)
    }
   
})

// delete product by current user
// go to the MyProducts component to see this api
router.delete('/:id', async (req,res) => {
    console.log(req.params.id);
    const data = await Product.deleteOne({_id: req.params.id});
    console.log(data);
    res.json(data)
})

// update product after booked 
// go to the MyProducts component to see this api
router.put('/:id', async (req,res) => {
    const updateDoc = {
              $set: {
                  booked: 'booked'
              }
          }
    const result = await Product.findOneAndUpdate({_id:req.params.id}, updateDoc, {new: true});
    res.json(result);
})
module.exports = router;