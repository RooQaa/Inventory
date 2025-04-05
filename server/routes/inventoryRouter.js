const express =require('express')
const router=express.Router();
const authController = require(`../controllers/authController`)
const inventoryController=require('../controllers/inventoryController')

//TOKEN CHECK
router.use(authController.protect)
//router.post('/',inventoryController.AddInventory)
router.get('/',inventoryController.getInventorys)
//ADMIN CHECK
router.use(authController.restrictTo('admin'));

module.exports=router;