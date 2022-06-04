const router = require('express').Router();
const createSevice = require('../services/createService')


router.get('/create', (req,res) => {
    res.render('create')
});

router.post('/create', (req,res) => {
    const cube = req.body;

    if(cube.name.length < 2){
        res.status(500).send('Invalid name');
        return
    }

    createSevice.save(cube)
    .then(() => {
        res.redirect('/')
    })
    .catch(err => {
        res.status(400).send(err)
    })
});

router.get('details/:id', (req,res) =>{
    res.render('details')
})

module.exports = router;