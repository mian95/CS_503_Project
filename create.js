const moongose = require('mongoose');

const userSchema = moongose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,  
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
})

const user = moongose.model('user', userSchema);



modules.exports = user;