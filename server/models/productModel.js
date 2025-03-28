const mongoose = require('mongoose');

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

const Product = mongoose.model('Product', productSchema);
module.exports = Product;