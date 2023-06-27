const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const orderSchema = require('../Schemas/orderSchema');
const Order = new mongoose.model("Order", orderSchema);

router.get('/', async (req,res) => {
    const email = req.query.email;
    const data = await Order.find({email:email});
    res.json(data);
})

router.post('/', async (req,res) => {
    const order = new Order(req.body);
    const data = await order.save();
    res.json(data);
})

router.delete('/', async (req,res) => {
    const data = await Order.deleteOne({_id: req.params.id});
    res.json(data);
})

module.exports = router;