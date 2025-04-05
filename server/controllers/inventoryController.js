const Inventory = require('../models/inventoryModel');
const { catchAsync } = require(`../utils/catchAsync`);
const AppError = require(`../utils/appError`);

/* exports.AddInventory= catchAsync(async(req,res)=>{
    const doc = await Inventory.create(req.body);
    res.status(201).json({
        status:true,
        message:"inventory Added Successfully",
        data:doc
    })
})
 */
exports.getInventorys=catchAsync(async (req,res,next)=>{
    const data = await Inventory.find();
    if(!data||data.length===0) return next(new AppError(`data n't found`,404))
        res.status(200).json({
            status:true,
            data
    })
})