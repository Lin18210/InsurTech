const express = require('express')
const router = express.Router()
const emailController = require('../controllers/emailController')

router.post('/receipt', emailController.sendReceipt)

module.exports = router
