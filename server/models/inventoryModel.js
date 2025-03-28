const mongoose = require('mongoose')
const inventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "please fill product"],
        unique: [true, "this product is already exist"]
    },
    quantity: {
        type: Number,
        required: [true,"please fill quantity"],
        default: 0
    },
})


inventorySchema.pre(/^find/,function(next){
    this.populate({
        path:'product',
        select:'-__v'
    }).select('-__v')
    next();
})