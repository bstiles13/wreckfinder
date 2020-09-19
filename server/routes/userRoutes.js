const express = require('express');
const router = new express.Router();
const userController = require('../controllers/userController.js');

router.get('/favorites', userController.getFavorites);

router.post('/favorites/create', userController.createFavorite);

router.post('/favorites/delete', userController.deleteFavorite);

module.exports = router;
