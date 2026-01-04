const express = require('express')
const router = express.Router()
const claimsController = require('../controllers/claimsController')

router.post('/submit', claimsController.submitClaim)
router.get('/user/:userId', claimsController.getUserClaims)
router.get('/all', claimsController.getAllClaims)
router.put('/:id/status', claimsController.updateClaimStatus)

module.exports = router
