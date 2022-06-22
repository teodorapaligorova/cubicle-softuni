const router = require('express').Router();
const userService = require('../services/userService');
const {sessionName } = require('../config/constants');
const { isEmail } = require('../utils/validators');

router.get('/register', (req,res) =>{

    res.render('user/register')
});

router.post('/register', async (req,res, next) => {

    if(!isEmail(req.body.username)){
        next({message: 'Invald email'})
    }

    let registeredUser = await userService.register(req.body)

    if(registeredUser){
        res.redirect('/user/login');
    }else{
        res.redirect('404')
    }
    
});

router.get('/login', (req,res) => {
    res.render('user/login');
})

router.post('/login', async(req,res) => {

    try{
        let loggedUserToken = await userService.login(req.body);

        if(!loggedUserToken){
          return res.redirect('404')
        }
        res.cookie(sessionName, loggedUserToken, { httpOnly: true })
        res.redirect('/');
    }catch(error){
        res.status(400)
        .render('user/login', {error: error.message})
    }
   
});

router.get('/logout', (req, res) => {
    res.clearCookie(sessionName);
    res.redirect('/');
})
module.exports = router;