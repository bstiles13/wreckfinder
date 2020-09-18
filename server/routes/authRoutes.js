const express = require('express');
const router = new express.Router();
const passport = require('passport');
const authController = require('../controllers/authController.js');

router.get('/login', passport.authenticate('facebook'));

router.get('/return', passport.authenticate('facebook', { failureRedirect: '/auth/login' }), authController.return);

router.get('/profile', require('connect-ensure-login').ensureLoggedIn(), authController.profile);

router.get('/logout', authController.logout);

module.exports = router;
