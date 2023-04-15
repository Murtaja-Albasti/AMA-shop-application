const express = require("express");
const router = express.Router();
const Product = require('../models/Product.js')

router.route('/').get((req,res)=>{
    Product.find(req.params.id).then(p =>{
       return res.status(200).json({message:"this is the data" , p})
       })
       .catch(err=>{res.status(401).json("no product")})
})


module.exports = router;