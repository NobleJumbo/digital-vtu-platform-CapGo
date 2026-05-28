const mogoose = require('mongoose');

const userSchema = new mogoose.Schema({
    name:{
        type:String,
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
},{timestamps:true}
);

exports = module.exports = mogoose.model("User",userSchema);