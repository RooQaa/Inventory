const mongoose = require('mongoose');
const Inventory=require('./inventoryModel')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product must has a name"],
        unique: [true, "this name used Before"],
        minlength: [3, "minmum 3 chars"]
    },
    price: {
        type: Number,
        default: 0
    },
    unit: {
        type: String,
        required: [true, "product must has a unit"]
    }
})

productSchema.post('save', async function(doc,next){
    try{
        const initialQuantity = doc._quantity || 0;
        await Inventory.create({product:doc._id, quantity:initialQuantity})  // Default quantity 0
        next();
    }
    catch(err){
        next(err)
    }
    
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;