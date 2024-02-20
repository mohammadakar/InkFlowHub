const mongoose=require("mongoose");
const joi=require("joi");


const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:200
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:10,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",//refer to User model
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        default:{
            url:"",
            publicId:null,
        }
    },
    likes:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
]

        
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

//populate comments for this post
PostSchema.virtual("comments",{
    ref:"Comment",
    foreignField:"postId",
    localField:"_id"
})

const Post=mongoose.model("Post",PostSchema)

function validateCreatePost(obj){
    const Schema=joi.object({
        title:joi.string().trim().min(2).max(200).required(),
        description:joi.string().trim().min(10).required(),
        category:joi.string().trim().required(),
    });
    return Schema.validate(obj);
}
function validateUpdatePost(obj){
    const Schema=joi.object({
        title:joi.string().trim().min(2).max(200),
        description:joi.string().trim().min(10),
        category:joi.string().trim(),
    });
    return Schema.validate(obj);
}

module.exports={
    Post,
    validateCreatePost,
    validateUpdatePost

}