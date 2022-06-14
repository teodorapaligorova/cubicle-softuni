const router = require('express').Router();
const userService = require('../services/userService')

router.get('/register', (req,res) =>{

    res.render('user/register')
});

router.post('/register', async (req,res) => {

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

router.post('/login', async(res,req) => {
   
   let loggedUser = await userService.login(req.body);

   res.redirect('/')
})
module.exports = router;