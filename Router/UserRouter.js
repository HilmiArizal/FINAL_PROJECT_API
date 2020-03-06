const express = require('express');
const { userController } = require('../Controller');
const router = express.Router();
const { auth } = require('../Helpers/auth')

router.get('/getAllUsers', userController.getAllUsers);
router.post('/login', userController.loginUsers);
router.post('/keepLogin', auth, userController.keepLogin);
router.post('/register', userController.registerUsers);
router.post('/emailverification', auth, userController.emailVerification);

module.exports = router;