const express = require('express')
const router = express.Router()
const financeController = require('../controllers/financeController')

router.get('/transactions/:userId', financeController.getUserTransactions)
router.get('/all', financeController.getAllTransactions)
router.get('/stats', financeController.getFinancialStats)

module.exports = router
