const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/product.controller')
router.get('/products', productsControllers.getAllproducts);
router.get('/products/:id', productsControllers.getProductDetails);


module.exports = router