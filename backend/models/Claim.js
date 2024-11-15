// models/Claim.js
const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  vehicleInfo: {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    licensePlate: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Under Appeal', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  submissionDate: { type: Date, default: Date.now },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClaimDocument' }], // Referencing claim-related documents
  feedback: String,
});

const Claim = mongoose.models.Claim || mongoose.model('Claim', claimSchema);

module.exports = Claim;
