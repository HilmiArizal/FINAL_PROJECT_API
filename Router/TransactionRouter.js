const express = require('express');
const { transactionController } = require('../Controller');
const router = express.Router();
const { auth } = require('../Helpers/auth')

router.get('/getAllTransactionPaid', transactionController.queryGetAllTransactionPaid);
router.get('/getAllTransactionProses', transactionController.queryGetAllTransactionOnProses);
router.get('/getTransaction', auth, transactionController.getTransaction);
router.post('/addTransaction', transactionController.addTransaction);
router.get('/getDetailTransaction', transactionController.getDetailTransaction);
router.post('/addDetailTransaction', transactionController.addDetailTransaction);
router.put('/editStatus', transactionController.editStatus);
router.get('/getAllTotal', transactionController.getAllTotalTransaction)
router.get('/getAllTotalProses', transactionController.getAllTotalTransactionProses)
router.get('/getProductPopuler', transactionController.getProductPopuler)
router.get('/getMetodeTransaksi', transactionController.getMetodeTransaction)


module.exports = router;