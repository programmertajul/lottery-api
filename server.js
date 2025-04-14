const express = require('express');
const connectDB = require('./db');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();

app.use(express.json());

const books = [
    {
        id: '101',
        name: 'personal book',
        price: 100,
    },

    {
        id: '102',
        name: 'dairy of life book',
        price: 500,
    },

    {
        id: '103',
        name: 'javascript book',
        price: 1000,
    },


    {
        id: '101',
        name: 'personal book',
        price: 100,
    },

    {
        id: '102',
        name: 'dairy of life book',
        price: 400,
    },

    {
        id: '103',
        name: 'javascript book',
        price: 1000,
    },
];







app.post('/register', async (req, res, next) => {

  const {name, email, password} = req.body;

  if (!name || !email || !password){

    return res.status(400).json({"message" : "invalid data"});


  }

 try{

    let user = await User.findOne({ email });

    if (user){
      return res.status(400).json({message: 'user already exist'});
  
  
    }
  
    user = new User({name, email, password});
  
  
  
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hash = await bcrypt.hash(user.password, salt);
    console.log(hash);
    console.log('this is bcryptjs');
    
    user.password = hash;
  
  
    await user.save();
  
    return res.status(201).json({message: 'user created sucessfully', user});

 } catch(e){


    next(e);

 }



});




app.post('/login', async (req, res, next) => {


    const {email, password} = req.body;

    try{

        const user = await User.findOne({ email });

        if (!user){
            return res.status(400).json({message: 'invalid credential'});

        }


        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){

            return res.status(400).json({message: 'invalid credential'});

        }



        delete user._doc.password;

        return res.status(200).json({message: 'login successful', user});

    } catch(e){

    }







});







app.get('/books', (req, res) => {

    console.log(req.query);


    if (req.query.show === 'all'){
        return res.json(books);
    }




    const result = books.filter((book) => book.price <= 500);


    res.json(result);
});


app.post('/books', (req, res) => {
     console.log(req.body);
     const book = req.body;
     books.push(book);
     res.json(books);


});



app.use((err, req, res, next) => {

    console.log(err);
    res.status(500).json({message: 'Server Error Occurred'});

});


connectDB('mongodb://127.0.0.1:27017/firstDB').then(() => {

    console.log('database is connected');

    app.listen(4000, () => {
        console.log('server is running atport 4000');
    });


}).catch((e)=>{

    console.log(e);
})




