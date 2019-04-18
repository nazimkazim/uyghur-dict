const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
var ObjectId = require('mongodb').ObjectID;

// Load Validation
const validateProfileInput = require('../../validation/profile');

// Load profile model
const Profile = require('../../models/Profile');

// Load word collection model
const WordCollection = require('../../models/Word');

// Load user profile
const User = require('../../models/User');

// @route  GET api/profile/test
// @desc   tests profile route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Profile works' }));

// @route  GET api/profile
// @desc   Get current user's profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar', 'email'])
      .then(profile => {
        if (!profile) {
          errors.nonprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  POST api/profile/handle/:handle
// @desc   Get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'email', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.nonprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route  POST api/profile/all
// @desc   Get all profiles
// @access Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar', 'email'])
    .then(profiles => {
      if (!profiles) {
        errors.nonprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route  POST api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'email', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.nonprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @route  POST api/profile
// @desc   Create or Edit user profile
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.education) profileFields.education = req.body.education;

    // Languages - Split into array
    if (typeof req.body.languages !== 'undefined') {
      profileFields.languages = req.body.languages.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.vk) profileFields.social.vk = req.body.vk;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route  POST api/word/:word_id
// @desc   Delete a word from profile
// @access Private
router.delete(
  '/word/:word_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const removeIndex = profile.words
        .map(word => word.id)
        .indexOf(req.params.word_id);

      //Splice out of array
      profile.words.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile));
    });
  }
);

module.exports = router;
