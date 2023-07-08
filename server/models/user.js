const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
     imageUrl:{
        type:String,
        required:true,
    },
    userID:{
        type:String,
        required:true
    },
    email_verified:{
        type:Boolean,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    auth_time:{
        type:String,
        required:true
    },


},
{timestamps:true}

)
module.exports=mongoose.model("user",UserSchema);
