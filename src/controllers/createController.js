const router = require('express').Router();
const createSevice = require('../services/createService');
const accessoryService = require('../services/accessoryService')


router.get('/create', (req,res) => {
    res.render('create')
});

router.post('/create', (req,res) => {
    const cube = req.body;

    if(cube.name.length < 2){
        res.status(500).send('Invalid name');
        return
    }

    createSevice.create(cube)
    .then(() => {
        res.redirect('/')
    })
    .catch(err => {
        res.status(400).send(err)
    })
});

router.get('/details/:id',  async(req,res) =>{
    const cube = await createSevice.getOne(req.params.id).lean();

    res.render('details', {cube})
});

router.get('/:cubeId/attach-accessory', async (req,res) => {
    const cube = await createSevice.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAll().lean()
    res.render('accessory/attachAccessory',{cube, accessories});
})


module.exports = router;