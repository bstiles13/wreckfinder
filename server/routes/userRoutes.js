const express = require('express');
const router = new express.Router();
const userController = require('../controllers/userController.js');
const { get } = require('lodash');

router.use((req, res, next) => {
  if (!get(req, 'user._id')) {
    console.log('Request rejected: Invalid or expired session');
    return res.status(401).send('Request rejected: Invalid or expired session');
  }

  next();
});

router.get('/favorites', userController.getFavorites);

router.post('/favorites/create', userController.createFavorite);

router.post('/favorites/delete', userController.deleteFavorite);

module.exports = router;
