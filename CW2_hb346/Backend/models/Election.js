// models/Election.js
const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  status: { type: String, default: 'pending' }, // pending, ongoing, completed
  constituency: { type: String, required: true },
  parties: { type: [String], required: true }, // Array of party names
  // Add other fields as needed
}, { timestamps: true });

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
