const express = require('express');

const homeController = require('./controllers/homeControler');
const createController = require('./controllers/createController');

const router = express.Router();

router.use('/', homeController);
router.use('/cube', createController);

module.exports = router;