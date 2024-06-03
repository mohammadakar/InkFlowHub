const asyncHandler=require("express-async-handler");
const {User, validateUpdateUser}=require("../models/User")
const bcrypt=require("bcryptjs")
const path=require("path")
const fs =require("fs");//from node js
const {cloudinaryRemoveImage,cloudinaryUploadImage,cloudinaryRemoveManyImage}=require("../util/cloudinary")
const {Comment}=require("../models/Comment")
const {Post}=require("../models/Post")
/** 
*@desc get All users profile
*@route /api/users/profile
*@method GET
*@access private (only admin)
*/

module.exports.getAllUsersController=asyncHandler(async (req,res)=>{
    const users =await User.find().select("-password").populate("posts")//.select("-password") except password;
    res.status(200).json(users)

});

/** 
*@desc get user Profile
*@route /api/users/profile/:id
*@method GET
*@access public
*/

module.exports.getUserProfile=asyncHandler(async (req,res)=>{
    const user =await User.findById(req.params.id).select("-password").populate("posts");
    if(!user){
        return res.status(404).json({message:"user not found"})
    }

    res.status(200).json(user)

});

/** 
*@desc update user Profile
*@route /api/users/profile/:id
*@method PUT
*@access private (only user himself)
*/

module.exports.updateUserProfile=asyncHandler(async (req,res)=>{
    const {error}=validateUpdateUser(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }

    if(req.body.password){
        const salt= await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(req.body.password,salt);
    }

    const updateUser=await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            password:req.body.password,
            bio:req.body.bio
        }
    },{new:true}).select("-password")
    .populate("posts");

    res.status(200).json(updateUser);
});

/** 
*@desc get Users Count
*@route /api/users/Count
*@method GET
*@access private (only admin)
*/

module.exports.getAllUsersCount=asyncHandler(async (req,res)=>{
    const count =await User.countDocuments();
    res.status(200).json(count)

});

/** 
*@desc Profile photo upload
*@route /api/users/profile/profile-photo-upload
*@method POST
*@access private (only logged in user)
*/

module.exports.profilePhotoUpload = asyncHandler(async (req, res) => {
    // Check if a file was provided
    if (!req.file) {
        return res.status(400).json({ message: "No file provided" });
    }

    try {
        // Construct image path
        const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

        // Upload image to Cloudinary
        const result = await cloudinaryUploadImage(imagePath);

        // Fetch user by ID
        const user = await User.findById(req.user.id);

        // Remove existing profile photo from Cloudinary
        if (user.profilePhoto && user.profilePhoto.publicId) {
            await cloudinaryRemoveImage(user.profilePhoto.publicId);
        }

        // Update user's profile photo
        user.profilePhoto = {
            url: result.secure_url,
            publicId: result.public_id
        };
        await user.save();

        // Send success response
        res.status(200).json({
            message: "Your profile photo uploaded successfully",
            profilePhoto: {
                url: result.secure_url,
                publicId: result.public_id
            }
        });

        // Cleanup: Delete the temporary image file
        fs.unlinkSync(imagePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error (cloudinary)" });
    }
});
/** 
*@desc delete User profile
*@route /api/users/profile/:id
*@method DELETE
*@access private (only admin or user himself)
*/

module.exports.deleteUserProfileCtrl=asyncHandler(async (req,res)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({message:"user not found"})
    }

    //get all posts from DB
    const posts=await Post.find({user:user._id});

    //get public ids from posts
    const publicIds=posts?.map((post)=>post.image.publicId)
    
    //delete all posts image from cloudinary belongs to this user
    if(publicIds?.length>0){
        await cloudinaryRemoveManyImage(user.profilePhoto.publicId)
    }

    if(user.profilePhoto.publicId !== null){
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
    }

    await Post.deleteMany({user:user._id})

    await Comment.deleteMany({user:user._id})

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({messgae:"account deleted"})
})