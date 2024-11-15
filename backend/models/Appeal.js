// models/Appeal.js
const mongoose = require('mongoose');

const appealSchema = new mongoose.Schema({
  claim_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Claim',
    required: true
  },
  appealMessage: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  submittedAt: { type: Date, default: Date.now },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  decisionDate: { type: Date }
});

const Appeal = mongoose.models.Appeal || mongoose.model('Appeal', appealSchema);

module.exports = Appeal;
