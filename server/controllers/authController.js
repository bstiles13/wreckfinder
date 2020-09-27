const passport = require('passport');

module.exports = {
  login: (req, res) => {
    console.log('Authenticate Facebook REQUEST');
    passport.authenticate('facebook');
  },

  return: (req, res) => {
    console.log('Authentication callback');
    res.redirect('http://localhost:3000/');
  },

  profile: (req, res) => {
    console.log('Profile REQUEST');
    res.status(200).send(req.user);
  },

  logout: async (req, res) => {
    console.log(`Logout REQUEST by: ${req.user.displayName}`);
    await req.logout();
    req.user = null;
    req.session.destroy(err => {
      if (err) {
        console.log(`Unable to clear session at logout: ${(err)}`);
      }
      console.log('Logout SUCCESS');
      res.redirect('http://localhost:3000/');
    });
  }
};
