const express = require('express');
const connectDB = require('./db');
const authenticate = require('./middleware/authenticate');
const routes = require('./routes/index');


const app = express();

app.use(express.json());
app.use(routes);






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









app.get('/private', authenticate, async (req, res) => {
    console.log('i am the user', req.user);
    
 
    return res.status(200).json({message: 'i am a private route'});


});



app.get('/public', (req, res) => {
    return res.status(200).json({message: 'i am a public route'});
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
    console.log('global error 1', err.status);

    const status = err.status ? err.status : 500;
    const message = err.message ? err.message : 'server error occurd';

    res.status(status).json({message,
    });

    console.log('global error 2', err.message);

});


connectDB('mongodb://127.0.0.1:27017/firstDB').then(() => {

    console.log('database is connected');

    app.listen(4000, () => {
        console.log('server is running atport 4000');
    });


}).catch((e)=>{

    console.log(e);
})




