const express = require('express');
const { cartContoller } = require('../Controller');
const router = express.Router();
const { auth } = require('../Helpers/auth')

router.post('/addToCart', cartContoller.addToCart)
router.get('/getCart', auth, cartContoller.getCart)
router.get('/getValueCart', auth, cartContoller.getValueCart)

module.exports = router;