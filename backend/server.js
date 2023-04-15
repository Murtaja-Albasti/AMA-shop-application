const express = require('express');
const app = express();

const bodyparser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 5000

const cors = require('cors');

const mongoose = require('mongoose');

const path = require('path');



app.use(cors())
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


const uri = process.env.MONGOOSE_URI;
mongoose.connect(uri,{useNewUrlParser: true});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

const connection = mongoose.connection
connection.once('open',()=>{
    console.log('mongoDB database established successfully!')
})


const ProductRouter = require('./routes/productRouter.js')
const UserRouter = require('./routes/userRouter.js')

app.use('/products',ProductRouter)
app.use('/user',UserRouter)

app.get('/',(req,res)=>{
    res.send('gg');
})

app.listen(port , ()=> {
    console.log(`server listening on port:${port} `)
})