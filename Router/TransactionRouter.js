const express = require('express');
const { transactionController } = require('../Controller');
const router = express.Router();
const { auth } = require('../Helpers/auth')

router.get('/getAllTransactionPaid', transactionController.getAllTransactionPaid);
router.get('/getAllTransactionProses', transactionController.getAllTransactionOnProses);
router.get('/getTransaction', auth, transactionController.getTransaction);
router.get('/getTransactionDate', transactionController.getTransactionGroupByDate);
router.post('/addTransaction', transactionController.addTransaction);
router.get('/getDetailTransaction', transactionController.getDetailTransaction);
router.post('/addDetailTransaction', transactionController.addDetailTransaction);
router.put('/editStatus', transactionController.editStatus);
router.get('/getAllTotal', transactionController.getAllTotalTransaction)
router.get('/getAllTotalWithoutDate', transactionController.getAllTotalTransactionWithoutDate)
router.get('/getAllTotalProses', transactionController.getAllTotalTransactionProses)
router.get('/getAllTotalProsesWithoutDate', transactionController.getAllTotalTransactionProsesWithoutDate)
router.get('/getProductPopuler', transactionController.getProductPopuler)
router.get('/getMetodeTransaksi', transactionController.getMetodeTransaction)
router.get('/getSalesProduct', transactionController.getSalesProduct)


module.exports = router;