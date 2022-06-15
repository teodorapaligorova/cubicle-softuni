const jwt = require('jsonwebtoken');
const { sessionName, secret } = require('../config/constants');
const {promisify} = require('util');

const jwtVerify = promisify(jwt.verify);

exports.user = async (req, res, next) => {
    let token = req.cookies[sessionName];

    if(token){
        try{
            let decodedToken = await jwtVerify(token, secret);
            req.user = decodedToken;

        }catch(err) {
            return res.redirect('/');
        }
       
    }

    next();
};

exports.isAuth = (req,res, next) => {

    if(!req.user){
       return res.redirect('/404')
    }

    next();
}