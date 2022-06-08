const router = require('express').Router();
const createService = require('../services/createService')

router.get('/', async(req,res)=>{
    const cubes = await createService.getAll()
    res.render('index',{cubes});
});

router.get = ('/about', (req,res) => {
    res.render('about');
});

module.exports = router;