const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const authRoutes = require('./server/routes/authRoutes');
const userRoutes = require('./server/routes/userRoutes');
const apiRoutes = require('./server/routes/apiRoutes');
const User = require('./server/models/user');

const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

// AUTH SETUP -------------------------------------------------------

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ id }, (err, user) => {
    done(err, user);
  });
});

const authOrigin = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/'
  : 'https://wreck-finder.herokuapp.com/';

passport.use(new Strategy({
  clientID: '726097894634616',
  clientSecret: '837301744bba9edd73f7bfa00165c476',
  callbackURL: authOrigin
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ id: profile.id }, (err, user) => {
    if (err) {
      console.log(`Find one user error: ${err}`);
    }

    if (user) {
      console.log(`Successful login by: ${profile.displayName}`);
      done(null, user);
    } else {
      user = new User({ id: profile.id, displayName: profile.displayName });
      user.save((err) => {
        if (err) {
          console.log(`Unable to save new user: ${err}`);
        } else {
          console.log(`Saved new user: ${profile.displayName}`);
          done(null, user);
        }
      });
    }
  });
}));

// ---------------------------------------------------------- AUTH END

// MIDDLEWARE SETUP --------------------------------------------------

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session({
  store: new FileStore({ path: './server/sessions' }),
  secret: 'ahoy matey',
  resave: false,
  saveUninitialized: false,
  rolling: false,
  cookie: {
    maxAge: 86400000 // 24 hours
  }
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(passport.initialize());
app.use(passport.session());

// --------------------------------------------------- MIDDLEWARE END

// ROUTES SETUP -----------------------------------------------------

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/api', apiRoutes);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

// -------------------------------------------------------- ROUTES END

// DYNAMODB SETUP ----------------------------------------------------

const db = process.env.MONGODB_URI || 'mongodb://localhost/wreck_db';

mongoose.connect(db, err => {
  if (err) {
    console.error(`Mongoose was unable to connect to the database: ${err}`);
  } else {
    console.log('Connected to MongoDB');
  }
});

// --------------------------------------------------------- DYNAMO END

app.listen(PORT, () => {
  console.log(`Successful connection on port ${PORT}`);
});
