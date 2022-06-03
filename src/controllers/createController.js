const router = require('express').Router();
const cubes = require('../db.json');
const fs = require('fs/promises');
const path = require('path');


router.get('/create', (req,res) => {
    res.render('create')
});

router.post('/create', (req,res) => {
    const cube = req.body;

    if(cube.name.length < 2){
        res.status(500).send('Invalid name');
        return
    }

    cubes.push(cube);
    fs.writeFile(path.resolve('src','db.json'), JSON.stringify(cubes))
    .then(() => {
        res.redirect('/')
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

module.exports = router;