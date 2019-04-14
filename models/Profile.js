const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const word = require('./Word');

// Create schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  languages: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  gender: {
    type: String
  },
  words: [word],
  education: {
    type: String
  },
  social: {
    vk: {
      type: String
    },
    instagram: {
      type: String
    },
    facebook: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
