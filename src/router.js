const express = require('express');

const homeController = require('./controllers/homeControler');
const createController = require('./controllers/createController');

const router = express.Router();

router.get('/', homeController.index);
router.use('/cube', createController);

module.exports = router;