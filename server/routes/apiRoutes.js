const express = require('express');
const router = new express.Router();
const apiController = require('../controllers/apiController.js');

router.get('/wrecks', apiController.getWrecks);

router.get('/wrecks/random', apiController.randomizeWrecks);

router.get('/wrecks/search', apiController.searchWrecks);

router.get('/wrecks/radius', apiController.searchRadius);

router.get('/wrecks/articles', apiController.searchArticles);

module.exports = router;
