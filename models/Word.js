const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  },
  ugrWordCyr: {
    type: String,
    required: true
  },
  ugrWordLat: {
    type: String,
    required: true
  },
  ugrWordArb: {
    type: String
  },
  rusTranslation: {
    type: String,
    required: true
  },
  engTranslation: {
    type: String,
    required: true
  },
  examples: [
    {
      exCyr: { type: String },
      trRus: { type: String },
      exLat: { type: String },
      trEng: { type: String },
      exArab: { type: String }
    }
  ],
  origin: {
    type: String
  },
  sphere: {
    type: String
  },
  see: {
    type: Boolean,
    default: false
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

module.exports = Word = mongoose.model("words", wordSchema);
