const passport = require('passport');

module.exports = {
  login: (req, res) => {
    passport.authenticate('facebook');
  },

  return: (req, res) => {
    res.redirect('http://localhost:3000/');
  },

  profile: (req, res) => {
    res.status(200).send(req.user);
  },

  logout: (req, res) => {
    req.logout();
    req.session.destroy(err => {
      if (err) {
        console.log(`Unable to clear session at logout: ${(err)}`);
      }
      res.redirect('http://localhost:3000/');
    });
  }
};
