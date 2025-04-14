const mongoose = require('mongoose');

function connectDB (connectionStri){
    return mongoose.connect(connectionStri);

}

module.exports = connectDB;

























