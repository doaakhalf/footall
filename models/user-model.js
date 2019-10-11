const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    phone_number:
    {
        type:String,
        unique:true,
        validator:(value)=>{

        },
        message:'{VALUE} is invalid phone number '
        
    },
    mail:String,
    location:String,
    
    password:{
        type:String,
        require:true,
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});

const userModel = mongoose.model('user', usersSchema);

module.exports = userModel;