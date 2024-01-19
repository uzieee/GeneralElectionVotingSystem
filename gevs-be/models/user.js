const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  dateOfBirth: String,
  constituency: String,
  uvc: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
