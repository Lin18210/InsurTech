const express = require('express')
const router = express.Router()
const insuranceController = require('../controllers/insuranceController')

router.get('/policies', insuranceController.getPolicies)
router.post('/policies', insuranceController.createPolicy)
router.put('/policies/:id', insuranceController.updatePolicy)
router.delete('/policies/:id', insuranceController.deletePolicy)
router.get('/subscriptions/:userId', insuranceController.getUserSubscriptions)
router.get('/subscriptions-all', insuranceController.getAllSubscriptions)
router.post('/subscribe', insuranceController.createSubscription)

module.exports = router

