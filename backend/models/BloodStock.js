const mongoose = require('mongoose');

// The correction is here: "Schema" now starts with a capital 'S'.
const bloodStockSchema = new mongoose.Schema({
  blood_group: { type: String, required: true, unique: true },
  units: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('BloodStock', bloodStockSchema);