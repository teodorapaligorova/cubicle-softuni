const express = require('express');

const homeController = require('./controllers/homeControler');
const createController = require('./controllers/createController');
const accessoryController = require('./controllers/accessoryController')

const router = express.Router();

router.use('/', homeController);
router.use('/cube', createController);
router.use('/accessory', accessoryController)

module.exports = router;