const express = require('express');
const router = express.Router();
const Word = require('../../models/Word');
const validateWordInput = require('../../validation/word');
const passport = require('passport');

// @route  GET api/words/test
// @desc   tests words route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Words works' }));

// @route  POST api/words
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

    Word.find({}).then(word => {
      if (
        word.filter(
          wrd =>
            wrd.ugrWordCyr.toString().toLowerCase() ===
            req.body.ugrWordCyr.toLowerCase()
        ).length !== 0
      ) {
        return res
          .status(404)
          .json({ wordalreadyexists: 'Word already exists' });
      } else {
        const newWord = new Word({
          user: req.user.id,
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
    });
  }
);

// @route  Put api/words/:id
// @desc   Update a word by id
// @access Private

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateWordInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      Word.findById(req.params.id)
        .then(word => {
          // Check for word owner
          if (word.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          const wordID = req.params.id;
          const wordInput = req.body;

          // Update
          Word.findByIdAndUpdate(
            { _id: wordID },
            { $set: wordInput },
            { returnOriginal: false },
            (err, word) => {
              if (err) {
                console.log(err);
              }
            }
          ).then(word => res.json(word));
        })
        .catch(err => res.status(404).json({ nowordfound: 'No word found' }));
    });
  }
);

// @route  GET api/words
// @desc   Dislay all words
// @access Public
router.get('/', (req, res) => {
  Word.find()
    .sort({ date: -1 })
    .then(words => res.json(words))
    .catch(err => res.status(404).json({ nonwordsfound: 'No words found' }));
});

//@route  Get api/words/:id
//@desc   Get word by id
//@access Public
router.get('/:id', (req, res) => {
  Word.findById(req.params.id)
    .then(word => res.json(word))
    .catch(err =>
      res.status(404).json({ nonwordfound: 'No word found with that ID' })
    );
});

//@route  DELETE api/words/:id
//@desc   DELETE word
//@access Private

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Word.findById(req.params.id)
        .then(word => {
          // Check for post owner
          if (word.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          word.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

module.exports = router;
