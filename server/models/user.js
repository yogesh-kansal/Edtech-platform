const mongoose = require('mongoose');
const crypto = require('crypto');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  password: {
    type: String,
    required: "Password is required",
    minLength: [6, 'Password must be at least 6 characters.']
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  educator: {
    type: Boolean,
    default: false
  },
})

module.exports = mongoose.model('User', UserSchema);
