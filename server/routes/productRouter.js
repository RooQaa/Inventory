const express =require('express')
const router=express.Router();
const authController = require(`../controllers/authController`)
const productController=require('../controllers/productController')

//TOKEN CHECK
router.use(authController.protect)
router.post('/',productController.AddProduct)
router.get('/',productController.getProducts)
//ADMIN CHECK
router.use(authController.restrictTo('admin'));

module.exports=router;