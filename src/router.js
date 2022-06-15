const express = require('express');

const homeController = require('./controllers/homeControler');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');
const userController = require('./controllers/userController');

const router = express.Router();

router.use('/', homeController);
router.use('/cube', cubeController);
router.use('/accessory', accessoryController);
router.use('/user', userController);
router.use('*', (req,res) =>{
    res.render('404')
});

module.exports = router;