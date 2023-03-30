const router = require('express').Router();
const userService = require('../services/userService');
const { getErrorMessage } = require('../utils/errorMapper')
const {sessionName } = require('../config/constants');
const { body, validationResult } = require('express-validator');
const usernameLength = 5;
const passwordLenght = 8;

router.get('/register', (req,res) =>{

    res.render('user/register')
});

router.post("/register",
  body("username").trim(),
  body("password").trim(),
  body("repeatPassword").trim(),
  body("username")
    .isLength({ min: usernameLength })
    .withMessage(`Username must be at least ${usernameLength} characters long`)
    .isAlphanumeric()
    .withMessage("Username must be numbers and letters only"),
  body("password")
    .isLength({ min: passwordLenght })
    .withMessage(`Password must be at least ${passwordLenght} characters long`),
  body("repeatPassword")
    .custom((repeatPassword, { req }) => repeatPassword == req.body.password)
    .withMessage("Password doesn`t match"),

  async (req, res) => {
    const { errors } = validationResult(req);

    try {
      if (errors.length > 0) {
        throw errors;
      }

      await userService.register(req.body);
      res.redirect("/user/login");
    } catch (error) {
      res.locals.errors = getErrorMessage(error);
      res.render("user/register", {title: "Sign in", field: { username: req.body.username }});
    }
  }
);

router.get('/login', (req,res) => {
    res.render('user/login');
})

router.post('/login',
body('username').trim(),
body('password').trim(),
body('username')
.notEmpty().withMessage(`Username is required`),
body('password')
.notEmpty().withMessage(`Password is required`),

async(req,res) => {

const { errors } = validationResult(req);

    try{

        if(errors.length > 0){
            throw errors;
        }
        let loggedUserToken = await userService.login(req.body);

        if(!loggedUserToken){
          return res.redirect('/')
        }
        res.cookie(sessionName, loggedUserToken, { httpOnly: true })
        res.redirect('/');
    }catch(error){
        res.locals.errors = getErrorMessage(error);
        res.render('user/login',{ title: "Log in"});
    }
   
});

router.get('/logout', (req, res) => {
    res.clearCookie(sessionName);
    res.redirect('/');
})
module.exports = router;