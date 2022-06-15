const router = require('express').Router();
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService')
const {isAuth} = require('../middlewares/userMiddleware');


router.get('/create',isAuth, (req,res) => {
    res.render('create')
});

router.post('/create', isAuth, (req,res) => {
    const cube = req.body;
    cube.owner = req.user._id;

    if(cube.name.length < 2){
        res.status(500).send('Invalid name');
        return
    }

    cubeService.create(cube)
    .then(() => {
        res.redirect('/')
    })
    .catch(err => {
        res.status(400).send(err)
    })
});

router.get('/details/:id', async(req,res) =>{
    const cube = await cubeService.getOne(req.params.id).lean();
    const isOwner = cube.owner == req.user?._id;
    res.render('details', { cube, isOwner })
});

router.get('/:cubeId/attach-accessory', async (req,res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAll().lean()
    res.render('accessory/attachAccessory',{cube, accessories});
});

router.post('/:cubeId/attach-accessory', async (req,res) => {
    const accessoryId = req.body.accessory;

    await cubeService.attachAccessory(req.params.cubeId, accessoryId)

    res.redirect(`/cube/details/${req.params.cubeId}`)
});

router.get('/:cubeId/edit', isAuth, async(req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    if(cube.owner != req.user._id) {
        
        return res.redirect('404');
    }

    if(!cube){
        return res.redirect('404')
    }
    res.render('editCube', { cube })
});

router.post('/:cubeId/edit', async (req, res) => {
    let editedCube = await cubeService.edit(req.params.cubeId, req.body)
    res.redirect(`/cube/details/${editedCube._id}`)
});


module.exports = router;