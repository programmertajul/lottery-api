const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const error = require('../utils/error');
const {findUserByProperty, createNewUser} = require('./user');


const registerService = async ({name, email, password}) => {

    let user = await findUserByProperty('email', email);
  
      if (user) throw error('user already exists', 400);
    
    
    
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      const hash = await bcrypt.hash(password, salt);
      console.log(hash);
      console.log('this is bcryptjs');

      return createNewUser({ name, email, password: hash });

    
      

}




const loginService = async ({email, password}) => {

    const user = await findUserByProperty('email', email);

        if (!user) throw error('invalid credential', 400);


        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) throw error('invalid credential', 400);


       const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        accountStatus: user.accountStatus,

        };

        return jwt.sign(payload, 'tajul', {expiresIn: '50s'});

    


};




module.exports = {
    registerService,
    loginService,
};