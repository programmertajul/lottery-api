const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v){

                return  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);

            },

        message: (props) => `Invalid email: ${props.value}`,

        },
    },
    roles :{
        type: [String],
        required: true,
        default: ['STUDENT'],

    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'pasword is too short'],
        

    },
    accountStatus: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'REJECTED'],
        default: 'PENDING',
        required: true,
    },
})


const User = model('User', userSchema);

module.exports = User;









