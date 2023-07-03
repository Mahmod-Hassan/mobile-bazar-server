const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const orderSchema = require('../Schemas/orderSchema');
const Order = new mongoose.model("Order", orderSchema);
const verifyToken = require('../middlewares/verifyToken');

// get all orders
router.get('/', verifyToken, async (req,res) => {
    const decodedEmail = req.decoded.email;
    const email = req.query.email;
    if(email !== decodedEmail){
        return res.status(402).send({ message: 'forbidden access' });
    }
    else {
        const data = await Order.find({email:email});
        res.json(data);
    }
    // const data = await Order.find({email:req.query.email});
    // res.json(data);
    })  

router.post('/', async (req,res) => {
    const order = new Order(req.body);
    const data = await order.save();
    res.json(data);
})

router.delete('/:id', async (req,res) => {
    const data = await Order.deleteOne({_id: req.params.id});
    res.json(data);
})

module.exports = router;