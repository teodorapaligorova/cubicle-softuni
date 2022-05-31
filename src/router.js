const express = require('express');

const homeController = require('./controllers/homeControler');

const router = express.Router();

router.get('/', homeController.index);

module.exports = router;