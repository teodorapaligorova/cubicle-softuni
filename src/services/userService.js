const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { saltRounds, secret } = require('../config/constants');


exports.register = async ({username, password, repeatPassword}) =>{

    try{

        if(password != repeatPassword){
            throw
        }

        let hashedPassword = await bcrypt.hash(password, saltRounds);

        let createdUser = User.create({
        username,
        password: hashedPassword
        })
    
        return createdUser;


    }catch(error){

    }
 
   
};

exports.login = async ({username, password}) => {

    let user = await User.findOne({username});

    if(!user){
        return 
    }

   const isValid = await bcrypt.compare(password, user.password);

   if(!isValid){
    throw {
        message: 'Ivalid username or password'
    }
   }

   let result = new Promise((resolve, reject) => {
    jwt.sign({_id: user._id,  username: user.username}, secret, {expiresIn: '3d'},(err, token) =>{
        if(err){
            return reject(err)
        }

        resolve(token);
    });
 });

 return result;
}