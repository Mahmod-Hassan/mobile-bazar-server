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

app.get('/', (req,res) => {
  res.send('server running')
})
// routes
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);

//404 error handler
app.use((req, res, next) => {
  next('requested url is not found');
})

// custom synchronous error handler
app.use((err, req, res, next) => {
  if(res.headersSent){
    // this next() call goes to express default error handler
    // that is invisible and default error handler of express
    // this error hanler set to the last
     next('there was an error')
  }
  else if(err.message){
    res.status(500).send('caught khaice amr error handler ar modde')
  }
  else{
    res.status(500).send('There was an problem')
  }
})

// listening on port 5000
app.listen(5000, () => {
    console.log(`Listening on port 5000`)
})