const express = require('express');
const router = new express.Router();
const apiController = require('../controllers/apiController.js');

router.get('/wrecks', apiController.getWrecks);

module.exports = router;
