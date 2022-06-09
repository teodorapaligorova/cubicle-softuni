const router = require('express').Router();
const accessoryService = require('../services/accessoryService')


router.get('/createAccessory', (req,res) => {
    res.render('accessory/createAccessory')
});

router.post('/createAccessory', async (req,res) =>{
    await accessoryService.create(req.body)
    res.redirect('/');
})
module.exports = router;