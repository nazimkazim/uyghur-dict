const express = require('express');
const router = express.Router();
const Word = require('../../models/Word');
const validateWordInput = require('../../validation/word');
const passport = require('passport');

// @route  GET api/words/test
// @desc   tests words route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Words works' }));

// @route  POST api/profile/word
// @desc   Add words to profile
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateWordInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    const newWord = new Word({
      ugrWordCyr: req.body.ugrWordCyr,
      rusTranslation: req.body.rusTranslation,
      example: req.body.example,
      exampleTranslation: req.body.exampleTranslation,
      origin: req.body.origin,
      sphere: req.body.sphere,
      lexis: req.body.lexis,
      grammar: req.body.grammar,
      partOfSpeech: req.body.partOfSpeech,
      style: req.body.style
    });

    newWord.save().then(word => res.json(word));
  }
);

module.exports = router;
