const router = require('express').Router();
const createService = require('../services/createService')

router.get('/', async(req,res)=>{
    let { search, from, to } = req.query;
    
    const cubes = await createService.getAll(search, from, to)
    res.render('index',{cubes, search, from, to});
});

router.get = ('/about', (req,res) => {
    res.render('about');
});

module.exports = router;