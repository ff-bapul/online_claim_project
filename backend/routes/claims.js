const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');
const claimController = require('../controllers/claimController');

// Create claim request
router.post('/create', authenticateJWT, claimController.createClaim);

// Get all claims for the logged-in user
router.get('/', authenticateJWT, claimController.getClaims);

// Update claim request information
router.put('/:id', authenticateJWT, claimController.updateClaim);

// Check claim status
router.get('/:id/status', authenticateJWT, claimController.getClaimStatus);

// Appeal rejected claim
router.post('/:id/appeal', authenticateJWT, claimController.appealClaim);

// Cancel claim request
router.delete('/:id', authenticateJWT, claimController.cancelClaim);

// Add feedback to a completed claim
router.post('/:id/feedback', authenticateJWT, claimController.addFeedback);

module.exports = router;
