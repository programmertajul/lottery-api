// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/test', {

//     serverSelectionTimeoutMS: 1000,

// }).then(async () => {

//     console.log('database is connected');

//     await createUser({name: 'kulubulu mia', email: 'kulubulu@gamil.com'});
//     await createUser({name: 'hitlar', email: 'hitlar@gamil.com'});
//     console.log('tajul islam');

//     mongoose.disconnect();

//     console.log('rafi islam');


// }).catch((e) => {

//     console.log(e);

// });



// const Schema = new mongoose.Schema({
//     name : String,
//     email : String,
// });


// const User = mongoose.model('user', Schema);


// async function createUser(data){

//     const user = new User({...data});
//    await user.save();
//     return user;
// }






