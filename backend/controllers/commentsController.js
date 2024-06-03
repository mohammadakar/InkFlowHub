const asyncHandler=require("express-async-handler");
const {Comment,validateCreateComment,validateUpdateComment}=require("../models/Comment")
const {User}=require("../models/User")

/** 
*@desc create new comment
*@route /api/comments
*@method POST
*@access private (only logged user)
*/
module.exports.createCommentCtrl=asyncHandler(async(req,res)=>{
    const {error}=validateCreateComment(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }

    const profile=await User.findById(req.user.id);

    const comment=await Comment.create({
        postId:req.body.postId,
        text:req.body.text,
        user:req.user.id,
        username:profile.username,
    });

    res.status(201).json(comment)
})

/** 
*@desc get all comment
*@route /api/comments
*@method GET
*@access private (only Admin)
*/
module.exports.getAllCommentCtrl=asyncHandler(async(req,res)=>{
    const comment=await Comment.find().populate("user")

    res.status(200).json(comment)
})

/** 
*@desc Delete comment
*@route /api/comments
*@method DELETE
*@access private (only Admin or owner of comment)
*/
module.exports.deleteCommentCtrl=asyncHandler(async (req,res)=>{
    const comment=await Comment.findById(req.params.id);
    if(!comment){
        res.status(404).json({message:"comment not found"})
    }

    if( req.user.id ===comment.user.toString() || req.user.isAdmin){
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"comment has been deleted"})
    }else{
        res.status(403).json({message:"you are not allowed"})
    }
    
});

/** 
*@desc update comment
*@route /api/comments/:id
*@method PUT
*@access private (only owner of the comment)
*/
module.exports.updateCommentCtrl=asyncHandler(async(req,res)=>{
    const {error}=validateUpdateComment(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }
    const comment=await Comment.findById(req.params.id);
    if(!comment){
        res.status(404).json({message:"comment not found"})
    }
    

    if(req.user.id !== comment.user.toString()){
        return res.status(403).json({message:"only comment owner can update his comment"})
    }

    const updatedComment=await Comment.findByIdAndUpdate(req.params.id,{
        $set:{
            text:req.body.text
        }
    },{new:true})

    res.status(200).json(updatedComment)

})