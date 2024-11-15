const Claim = require('../models/Claim');
const ClaimStatusHistory = require('../models/ClaimStatusHistory');
const Appeal = require('../models/Appeal');

// Create a new claim
const createClaim = async (req, res) => {
  try {
    const claim = new Claim({
      vehicleInfo: req.body.vehicleInfo,
      user_id: req.userId
    });

    // Save the claim
    await claim.save();

    // Create an initial claim status history entry
    const statusHistory = new ClaimStatusHistory({
      claim_id: claim._id,
      oldStatus: 'Pending',
      newStatus: claim.status,
      changedBy: req.userId
    });
    await statusHistory.save();

    res.status(201).json({
      success: true,
      message: 'Claim created successfully',
      data: claim
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating claim',
      error
    });
  }
};

// Get all claims for the logged-in user
const getClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ user_id: req.userId });
    res.status(200).json({
      success: true,
      message: 'Claims fetched successfully',
      data: claims
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching claims',
      error
    });
  }
};

// Update claim details
const updateClaim = async (req, res) => {
  try {
    const claim = await Claim.findOneAndUpdate(
      { _id: req.params.id, user_id: req.userId },
      { vehicleInfo: req.body.vehicleInfo },
      { new: true }
    );

    if (!claim) return res.status(404).json({
      success: false,
      message: 'Claim not found'
    });

    // Create a new claim status history entry for any update
    const statusHistory = new ClaimStatusHistory({
      claim_id: claim._id,
      oldStatus: claim.status,
      newStatus: claim.status, // Assuming the status remains unchanged unless explicitly updated
      changedBy: req.userId
    });
    await statusHistory.save();

    res.status(200).json({
      success: true,
      message: 'Claim updated successfully',
      data: claim
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating claim',
      error
    });
  }
};

// Get claim status
const getClaimStatus = async (req, res) => {
  try {
    const claim = await Claim.findOne({ _id: req.params.id, user_id: req.userId });
    if (!claim) return res.status(404).json({
      success: false,
      message: 'Claim not found'
    });

    res.status(200).json({
      success: true,
      message: 'Claim status fetched successfully',
      data: { status: claim.status }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching claim status',
      error
    });
  }
};

// Appeal rejected claim
const appealClaim = async (req, res) => {
  try {
    const claim = await Claim.findOne({ _id: req.params.id, user_id: req.userId, status: 'Rejected' });
    if (!claim) return res.status(404).json({
      success: false,
      message: 'Claim not found or not rejected'
    });

    // Create an appeal for the claim
    const appeal = new Appeal({
      claim_id: claim._id,
      appealMessage: req.body.appealMessage,
      status: 'Pending',
      submittedAt: Date.now(),
      reviewedBy: req.userId
    });
    await appeal.save();

    // Update claim status to 'Under Appeal'
    claim.status = 'Under Appeal';
    await claim.save();

    // Log the status change in the history
    const statusHistory = new ClaimStatusHistory({
      claim_id: claim._id,
      oldStatus: 'Rejected',
      newStatus: 'Under Appeal',
      changedBy: req.userId
    });
    await statusHistory.save();

    res.status(200).json({
      success: true,
      message: 'Claim appealed successfully',
      data: appeal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error appealing claim',
      error
    });
  }
};

// Cancel claim
const cancelClaim = async (req, res) => {
  try {
    const claim = await Claim.findOneAndDelete({ _id: req.params.id, user_id: req.userId });
    if (!claim) return res.status(404).json({
      success: false,
      message: 'Claim not found'
    });

    // Log the cancellation in the status history
    const statusHistory = new ClaimStatusHistory({
      claim_id: claim._id,
      oldStatus: claim.status,
      newStatus: 'Canceled',
      changedBy: req.userId
    });
    await statusHistory.save();

    res.status(200).json({
      success: true,
      message: 'Claim canceled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error canceling claim',
      error
    });
  }
};

const addFeedback = async (req, res) => {
    try {
      // Find the claim based on its ID, user, and status
      const claim = await Claim.findOne({
        _id: req.params.id,
        user_id: req.userId,
        status: 'Completed'
      });
  
      // If claim is not found or is not in the 'Completed' status, return error
      if (!claim) {
        return res.status(404).json({
          success: false,
          message: 'Claim not found or not completed'
        });
      }
  
      // Add the feedback to the claim object
      claim.feedback = req.body.message;  // Capture feedback from the request body
      
  
      // Save the updated claim with the feedback
      await claim.save();
  
      // Send success response
      res.status(200).json({
        success: true,
        message: 'Feedback added successfully',
        data: claim
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error adding feedback',
        error
      });
    }
  };

module.exports = {
  createClaim,
  getClaims,
  updateClaim,
  getClaimStatus,
  appealClaim,
  cancelClaim,
  addFeedback
};

