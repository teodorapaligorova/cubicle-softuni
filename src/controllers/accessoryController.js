const router = require('express').Router();
const accessoryService = require('../services/accessoryService');
const { getErrorMessage } = require('../utils/errorMapper');
const { body, validationResult } = require('express-validator');
const nameLength = 5;
const minLength = 20;
const maxLength = 150;

router.get('/createAccessory', (req,res) => {
    res.render('accessory/createAccessory')
});

router.post('/createAccessory',
body("name").trim(),
body("description").trim(),
body("imageUrl").trim(),
body("name")
  .isLength({ min: nameLength })
  .withMessage(`Cube name must be at least ${nameLength} characters long`)
  .isAlphanumeric(['en-US'],{'ignore':' _-`'})
  .withMessage("Accessory name must be numbers and letters only"),
body("description")
  .isLength({ min: minLength, max: maxLength })
  .withMessage(`Desctiption must be from ${minLength} to ${maxLength} characters long`),
body("imageUrl")
  .isURL()
  .withMessage("Image url should be a link"),
async (req,res) =>{

    const accessory = req.body;
    const { errors } = validationResult(req);

    try{
        if (errors.length > 0) {
            throw errors;
          }
        await accessoryService.create(accessory)
        res.redirect('/');
    }catch(error){
        res.locals.errors = getErrorMessage(error);
        res.render("accessory/createAccessory", {title: "Add Accessory", accessory })
    }
 
})
module.exports = router;