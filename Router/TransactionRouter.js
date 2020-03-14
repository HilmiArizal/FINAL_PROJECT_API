const express = require('express');
const { transactionController } = require('../Controller');
const router = express.Router();
const { auth } = require('../Helpers/auth')

router.get('/getAllTransaction', transactionController.getAllTransaction);
router.get('/getTransaction', auth, transactionController.getTransaction);
router.post('/addTransaction', transactionController.addTransaction);
router.get('/getDetailTransaction', transactionController.getDetailTransaction);
router.post('/addDetailTransaction', transactionController.addDetailTransaction);
router.put('/editStatus', transactionController.editStatus);


module.exports = router;