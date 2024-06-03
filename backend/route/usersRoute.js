const { getAllUsersController, getUserProfile, updateUserProfile, getAllUsersCount, profilePhotoUpload, deleteUserProfileCtrl } = require("../controllers/usersController");
const {verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyToken, verifyTokenAndAuthorization} = require("../middlewares/verifyToken");
const router=require("express").Router();
const validateObjectId=require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");

router.route("/profile").get(verifyTokenAndAdmin,getAllUsersController)

router.route("/profile/:id").get(validateObjectId,getUserProfile)

router.route("/profile/:id").put(validateObjectId,verifyTokenAndOnlyUser,updateUserProfile);

router.route("/profile/:id").delete(validateObjectId,verifyTokenAndAuthorization,deleteUserProfileCtrl)

router.route("/profile/profile-photo-upload").post(verifyToken,photoUpload.single("image"),profilePhotoUpload)

router.route("/count").get(verifyTokenAndAdmin,getAllUsersCount)
module.exports=router