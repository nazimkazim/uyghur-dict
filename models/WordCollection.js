const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const word = require('./Word');

// Create schema
const wordCollectionSchema = new Schema({
  wordCollection: [word]
});

module.exports = User = mongoose.model('wordCollection', wordCollectionSchema);
