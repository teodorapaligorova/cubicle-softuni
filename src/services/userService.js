const bcrypt = require('bcrypt');
const User = require('../models/User');
const saltRounds = 10;
exports.register = async ({user, password, repeatPassword}) =>{

if(password != repeatPassword){
    return
}

let hashedPassword = await bcrypt.hash(password, saltRounds);

let createdUser = User.create({
    username,
    password: hashedPassword
})

return createdUser;
}