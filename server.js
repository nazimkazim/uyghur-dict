const express = require('express');
mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const words = require('./routes/api/words');
const posts = require('./routes/api/posts');
const passport = require('passport');
const path = require('path');
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
app.use('/api/posts', posts);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
//log.Fatal(http.ListenAndServe(':' + os.Getenv('PORT'), router));
app.listen(port, () => console.log(`Server running on port ${port}`));
