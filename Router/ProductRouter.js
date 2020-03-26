const express = require('express');
const { productController } = require('../Controller');
const router = express.Router();

router.get('/getAllProducts', productController.getAllProducts);
router.get('/getGroupByCategory', productController.getGroupByCategory);
router.get('/getProduct', productController.getProduct);
router.get('/getCategory', productController.getCategory);
router.get('/getProductCategory', productController.getProductCategory);
router.get('/getSize', productController.getSize);
router.get('/getPrice', productController.getPrice);
router.get('/getStock', productController.getStock);
router.get('/getStockId/:id', productController.getStockId);
router.get('/getProductId', productController.getProductId);
router.post('/AddProducts', productController.AddProducts);
router.delete('/DeleteProducts', productController.DeleteProducts);
router.delete('/DeleteStocks', productController.DeleteStocks);
router.patch('/EditProducts/:id', productController.EditProducts);

module.exports = router;