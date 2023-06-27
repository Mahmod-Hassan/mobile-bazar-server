const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');

// express app initialization
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// mongodb uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lcblope.mongodb.net/?retryWrites=true&w=majority`;

// database connection wiht mongoose
mongoose
.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => console.log('connection successfull'))
.catch((err) => console.log(err))

// routes
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);
app.listen(5000, () => {
    console.log(`Listening on port 5000`)
})