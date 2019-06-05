const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const userSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profiles'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', userSchema);
