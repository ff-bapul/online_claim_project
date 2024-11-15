// models/ClaimDocument.js
const mongoose = require('mongoose');

const claimDocumentSchema = new mongoose.Schema({
  claim_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Claim',
    required: true
  },
  filePath: { type: String, required: true }, // The path to the stored document
  fileType: { type: String, required: true },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploadedAt: { type: Date, default: Date.now }
});

const ClaimDocument = mongoose.models.ClaimDocument || mongoose.model('ClaimDocument', claimDocumentSchema);

module.exports = ClaimDocument;
