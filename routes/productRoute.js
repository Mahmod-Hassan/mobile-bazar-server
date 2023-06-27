const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const productSchema = require('../Schemas/productSchema');
const Product = new mongoose.model("Product", productSchema);

// post a product to database
// go the AddProduct component to see this api
router.post('/', async (req,res) => {
    const product = new Product(req.body);
    const data = await product.save();
    res.json(data);
})

// get product category wise
// go to the GetProductsById component to see this api
router.get('/category', async (req,res) => {
    const data = await Product.find({category: req.query.category});
    res.json(data)
})

// get product by current user email
// go to the MyProducts component to see this api
router.get('/my', async (req,res) => {
    const data = await Product.find({email: req.query.email});
    res.json(data)
})

// delete product by current user
// go to the MyProducts component to see this api
router.delete('/:id', async (req,res) => {
    const data = await Product.deleteOne({_id: req.params.id});
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