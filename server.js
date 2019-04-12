const express = require('express');
mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const words = require('./routes/api/words');
const passport = require('passport');
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/words', words);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
