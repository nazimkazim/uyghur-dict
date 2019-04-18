const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  },
  ugrWordCyr: {
    type: String,
    required: true
  },
  rusTranslation: {
    type: String,
    required: true
  },
  example: {
    type: String
  },
  exampleTranslation: {
    type: String
  },
  origin: {
    type: String
  },
  sphere: {
    type: String
  },
  lexis: {
    type: String
  },
  grammar: {
    type: String
  },
  partOfSpeech: {
    type: String
  },
  style: {
    type: String
  }
});

module.exports = Word = mongoose.model('words', wordSchema);
