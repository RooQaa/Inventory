const Product = require('../models/productModel');
const { catchAsync } = require(`../utils/catchAsync`);
const AppError = require(`../utils/appError`);

exports.AddProduct= catchAsync(async(req,res,next)=>{
    const doc = await Product.create(req.body);
    res.status(201).json({
        status:true,
        message:"product Added Successfully",
        data:doc
    })
})

exports.getProducts=catchAsync(async (req,res,next)=>{
    const data = await Product.find();
    if(!data||data.length===0) return next(new AppError(`data n't found`,404))
        res.status(200).json({
            status:true,
            data
    })
})