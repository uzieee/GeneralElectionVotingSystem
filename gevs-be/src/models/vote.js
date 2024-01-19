const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  constituency: { type: String, required: true },
  party: { type: String, required: true },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
