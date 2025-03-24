const express = require('express');
const router = express.Router();
const authController = require(`../controllers/authController`)


router.post('/login', authController.login);
router.use(authController.protect)
router.get('/logout',authController.logOut)




module.exports = router;