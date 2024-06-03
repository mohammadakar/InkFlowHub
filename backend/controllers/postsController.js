const fs=require("fs");
const path=require("path");
const asyncHandler=require("express-async-handler");
const {cloudinaryUploadImage, cloudinaryRemoveImage}=require("../util/cloudinary");
const {Post,validateCreatePost,validateUpdatePost}=require("../models/Post");
const {Comment}=require("../models/Comment")

/** 
*@desc create new post
*@route /api/posts
*@method POST
*@access private (only logged in user)
*/

module.exports.createPostCtrl=asyncHandler(async (req,res)=>{
    //validation for image
    if(!req.file){
        return res.status(400).json({message:"no image provided"})
    }
    //validate for data
    const {error}=validateCreatePost(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    //upload photo
    const imagePath=path.join(__dirname,`../images/${req.file.filename}`);
    const result= await cloudinaryUploadImage(imagePath);
    
    //create new post and save it to DB
    const post=await Post.create({
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        user:req.user.id,
        image:{
            url:result.secure_url,
            publicId:result.public_id
        }
    });
    
    //send res to client 
    res.status(201).json(post);

    //remove image from server 
    fs.unlinkSync(imagePath)
})

/** 
*@desc get all post
*@route /api/posts
*@method Get
*@access public
*/

module.exports.getAllPostsCtrl=asyncHandler(async (req,res)=>{
    const POST_PER_PAGE=3;
    const {pageNumber,category}=req.query;
    let posts;

    if(pageNumber){
        posts= await Post.find()
        .skip((pageNumber - 1) * POST_PER_PAGE)
        .limit(POST_PER_PAGE)
        .sort({createdAt: -1})
        .populate("user",["-password"]).populate("comments")
        //.sort sorting the posts from the newest 
    }else if(category){
        posts=await Post.find({category}).sort({createdAt: -1}).populate("user",["-password"]).populate("comments")
    }else{
        posts=await Post.find()
        .sort({createdAt: -1})
        .populate("user",["-password"]).populate("comments");//.populate it takes the user id and go to database and bring all the properties for this user
    }
    res.status(200).json(posts)
})

/** 
*@desc get single post
*@route /api/posts/:id
*@method Get
*@access public
*/

module.exports.getSinglePostCtrl=asyncHandler(async (req,res)=>{
    const post=await Post.findById(req.params.id)
    .populate("user",["-password"])
    .populate("comments")
    
    if(!post){
        return res.status(400).json({message:"post not found"})
    }
    res.status(200).json(post)
})

/** 
*@desc get posts count
*@route /api/posts/count
*@method Get
*@access public
*/

module.exports.getPostsCountCtrl=asyncHandler(async (req,res)=>{
    const count=await Post.countDocuments();
    

    res.status(200).json(count)
})

/** 
*@desc delete post
*@route /api/posts/:id
*@method DELETE
*@access private (admin or owner)
*/

module.exports.DeletePostCtrl=asyncHandler(async (req,res)=>{
    const post=await Post.findById(req.params.id)
    
    if(!post){
        return res.status(400).json({message:"post not found"})
    }
    
    if(req.user.isAdmin || req.user.id === post.user.toString()){
        await Post.findByIdAndDelete(req.params.id);
        await cloudinaryRemoveImage(post.image.publicId);

    //delete all comments that belong to this post
    await Comment.deleteMany({postId:post._id});

        res.status(200).json({message:"post has been deleted successfully",
        postID:post._id})
    }else{
        res.status(403).json({message:"access denied , forbidden"})
    }
})

/** 
*@desc update post
*@route /api/posts/:id
*@method PUT
*@access private (only owner user)
*/
module.exports.updatePostCtrl=asyncHandler(async (req,res)=>{
    //validation
    const {error}=validateUpdatePost(req.body);

    if(error){
        return res.status(400).json({message:error.details[0].message})
    }

    //get the post from DB and check if post exist
    const post = await Post.findById(req.params.id);
    
    if(!post){
        return res.status(404).json({message:"post not found!"});
    }

    //check if this post belong to owner
    if(req.user.id !== post.user.toString()){
        return res.status(403).json({message:"access denied , you are not allowed"});
    }

    //update post
    const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
        $set:{
            title:req.body.title,
            description:req.body.description,
            category:req.body.category
        }
    },{new:true}).populate("user",["-password"]).populate("comments")

    //send res to client
    res.status(200).json(updatedPost)

});

/** 
*@desc update post image
*@route /api/posts/update-image/:id
*@method PUT
*@access private (only owner user)
*/
module.exports.updatePostImageCtrl=asyncHandler(async (req,res)=>{
    //validation
    if(!req.file){
        return res.status(400).json({message:"no image provided"})
    }

    //get the post from DB and check if post exist
    const post = await Post.findById(req.params.id);
    
    if(!post){
        return res.status(404).json({message:"post not found!"});
    }

    //check if this post belong to owner
    if(req.user.id !== post.user.toString()){
        return res.status(403).json({message:"access denied , you are not allowed"});
    }

    //delete post image
    await cloudinaryRemoveImage(post.image.publicId)

    //upload new photo
    const imagePath=path.join(__dirname,`../images/${req.file.filename}`);
    const result=await cloudinaryUploadImage(imagePath);

    //update Image in DB
    const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
        $set:{
            image:{
                url:result.secure_url,
                publicId:result.public_id
            }
        }
    },{new:true})

    //res to client
    res.status(200).json(updatedPost);

    //remove image from server
    fs.unlinkSync(imagePath);
    
});

/** 
*@desc toggle like
*@route /api/posts/like/:id
*@method PUT
*@access private (only logged in user)
*/
module.exports.toggleLikeCtrl=asyncHandler(async (req,res)=>{
    let post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({message:"post not found!"});
    }

    const isPostAlreadyLiked=post.likes.find(
        (user)=>user.toString()===req.user.id);

    if(isPostAlreadyLiked){
        post = await Post.findByIdAndUpdate(req.params.id,{
            $pull:{likes:req.user.id}
        },{new:true});
    }else{
        post = await Post.findByIdAndUpdate(req.params.id,{
            $push:{likes:req.user.id}
        },{new:true});
    }

    res.status(200).json(post)

})

