const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    ProductName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price:{type:Number, required: true},
    image:{
        type: String, required: true
    },
    date:{type:Date, required: true},
    category:{type:String, required: true}
},{
    timestamps:true
});

const Product = mongoose.model('Product',productSchema)

module.exports = Product;
// module.exports = productSchema;