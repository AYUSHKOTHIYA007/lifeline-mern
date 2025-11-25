const mongoose = require('mongoose');

// A Mongoose Schema defines the structure of documents in a MongoDB collection.
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // IMPORTANT: In a real app, this should always be hashed!
  age: { type: Number, required: true },
  blood_group: { type: String, required: true },
  gender: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  last_donation_date: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
});

// A Mongoose Model provides an interface to the database for CRUD operations (Create, Read, Update, Delete).
module.exports = mongoose.model('User', userSchema);