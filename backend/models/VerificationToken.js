const mongoose=require("mongoose");

//category Schema
const VerificationTokenSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    token:{
        type:String,
        required:true,
    } 
},{timestamps:true});

//category model
const VerificationToken=mongoose.model("VerificationToken",VerificationTokenSchema);



module.exports={
    VerificationToken
}