const express = require('express');
const router = express.Router();

// @route  GET api/words/test
// @desc   tests words route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Words works' }));

module.exports = router;
