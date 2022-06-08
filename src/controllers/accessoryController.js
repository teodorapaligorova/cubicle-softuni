const router = require('express').Router();

router.get('/createAccessory', (req,res) => {
    res.render('accessory/createAccessory')
});

router.post('/createAccessory', (req,res) =>{
    
    res.redirect('/');
})
module.exports = router;