const router = require('express').Router();
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const { body, validationResult } = require('express-validator');
const {isAuth} = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utils/errorMapper');
const nameLength = 5;
const minLength = 20;
const maxLength = 150;

router.get('/create',isAuth, (req,res) => {
    res.render('create')
});

router.post('/create', isAuth, 
body("name").trim(),
body("description").trim(),
body("imageUrl").trim(),
body("name")
  .isLength({ min: nameLength })
  .withMessage(`Cube name must be at least ${nameLength} characters long`)
  .isAlphanumeric(['en-US'],{'ignore':' _-`'})
  .withMessage("Cube name must be numbers and letters only"),
body("description")
  .isLength({ min: minLength, max: maxLength })
  .withMessage(`Desctiption must be from ${minLength} to ${maxLength} characters long`),
body("imageUrl")
  .isURL()
  .withMessage("Image url should be a link"),
async (req,res) => {

    const cube = req.body;
    cube.owner = req.user._id;
    const { errors } = validationResult(req);

 try{

    if (errors.length > 0) {
        throw errors;
      }

    await cubeService.create(cube);
    res.redirect('/')

 }catch(error){
    res.locals.errors = getErrorMessage(error);
    res.render("create", {title: "Add Cube", cube: req.body })
}
});

router.get('/details/:id', async(req,res) =>{

    try{
        const cube = await cubeService.getOne(req.params.id).lean();
        const isOwner = cube.owner == req.user?._id;
        res.render('details', { cube, isOwner }) 
    }catch(error){
        res.locals.errors = getErrorMessage(error);
        res.redirect('404');
    }

});

router.get('/:cubeId/attach-accessory', async (req,res) => {

    try{
        const cube = await cubeService.getOne(req.params.cubeId).lean();
        const accessories = await accessoryService.getAll().lean()
        res.render('accessory/attachAccessory',{cube, accessories});
    }catch(error){
        res.locals.errors = getErrorMessage(error);
        res.redirect('404');
    }
  
});

router.post('/:cubeId/attach-accessory', async (req,res) => {

    const accessoryId = req.body.accessory;

    try{
        await cubeService.attachAccessory(req.params.cubeId, accessoryId);
        res.redirect(`/cube/details/${req.params.cubeId}`);

    }catch(error){
        res.locals.errors = getErrorMessage(error);
        res.render('accessory/attachAccessory', {title: "Atach Accessory"})
    }

   
});

router.get('/:cubeId/edit', isAuth, async(req, res) => {

    try{

        const cube = await cubeService.getOne(req.params.cubeId).lean();

        if(cube.owner != req.user._id) {
            
            return res.redirect('404');
        }

        if(!cube){
            return res.redirect('404');
        }

        cube[`difficultyLevel${cube.difficultyLevel}`] = true;
        res.render('editCube', {title: 'Edit Cube', cube });

    }catch(error){
        res.locals.errors = getErrorMessage(error);
        res.render('editCube', { title: 'Edit Cube', cube: req.body});
    }
  

});

router.post('/:cubeId/edit',
body("name").trim(),
body("description").trim(),
body("imageUrl").trim(),
body("name")
  .isLength({ min: nameLength })
  .withMessage(`Cube name must be at least ${nameLength} characters long`)
  .isAlphanumeric(['en-US'],{'ignore':' _-`'})
  .withMessage("Cube name must be numbers and letters only"),
body("description")
  .isLength({ min: minLength, max: maxLength })
  .withMessage(`Desctiption must be from ${minLength} to ${maxLength} characters long`),
body("imageUrl")
  .isURL()
  .withMessage("Image url should be a link"),
async (req, res) => {

    const { errors } = validationResult(req);

    try{
        if (errors.length > 0) {
            throw errors;
          }
    
        let editedCube = await cubeService.edit(req.params.cubeId, req.body);
        res.redirect(`/cube/details/${editedCube._id}`);
    }catch(error){
        res.locals.errors = getErrorMessage(error);
        res.render('editCube', { title: 'Edit Cube', cube: req.body });
    }
    
});

router.get('/:cubeId/delete', async(req,res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    res.render('deleteCube', { cube });

});

router.post('/:cubeId/delete', async(req,res) => {

    await cubeService.delete(req.params.cubeId);

    res.redirect('/');

});


module.exports = router;