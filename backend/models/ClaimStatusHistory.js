// models/ClaimStatusHistory.js
const mongoose = require('mongoose');

const claimStatusHistorySchema = new mongoose.Schema({
  claim_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Claim',
    required: true
  },
  oldStatus: { type: String, required: true },
  newStatus: { type: String, required: true },
  changedAt: { type: Date, default: Date.now },
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const ClaimStatusHistory = mongoose.models.ClaimStatusHistory || mongoose.model('ClaimStatusHistory', claimStatusHistorySchema);

module.exports = ClaimStatusHistory;
