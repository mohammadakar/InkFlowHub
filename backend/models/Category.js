const mongoose=require("mongoose");
const joi=require("joi");

//category Schema
const CategorySchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    } 
},{timestamps:true});

//category model
const Category=mongoose.model("Category",CategorySchema);

//validate create category
function validateCreateCategory(obj){
    const schema=joi.object({
        title:joi.string().trim().required().label("Title")
    });
    return schema.validate(obj);
}

module.exports={
    Category,
    validateCreateCategory
}