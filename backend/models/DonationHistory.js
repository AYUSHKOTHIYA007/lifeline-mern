const mongoose = require('mongoose');

const donationHistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  donation_date: { type: Date, required: true },
  venue: { type: String, required: true },
  units: { type: Number, default: 1 },
});

module.exports = mongoose.model('DonationHistory', donationHistorySchema);