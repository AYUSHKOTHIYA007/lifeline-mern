const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  patient_name: { type: String, required: true },
  blood_group: { type: String, required: true },
  units_required: { type: Number, required: true },
  hospital_name: { type: String, required: true },
  contact_person: { type: String, required: true },
  contact_mobile: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);