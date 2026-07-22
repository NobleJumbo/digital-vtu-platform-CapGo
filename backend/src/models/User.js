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
     phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isVerified:{
     type:Boolean,
     dafault:false
    },
    role: {
  type: String,
  enum: ["user","admin"],
  default: "user",
    },
     isBlocked: {
     type: Boolean,
     default: false,
    },
     },{timestamps:true}
);

exports = module.exports = mogoose.model("User",userSchema);