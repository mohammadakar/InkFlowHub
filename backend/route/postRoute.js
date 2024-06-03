const router=require("express").Router();
const { createPostCtrl, getAllPostsCtrl, getSinglePostCtrl, getPostsCountCtrl, DeletePostCtrl, updatePostCtrl, updatePostImageCtrl, toggleLikeCtrl } = require("../controllers/postsController");
const photoUpload=require("../middlewares/photoUpload");
const {verifyToken}=require("../middlewares/verifyToken");
const validateObjectId=require("../middlewares/validateObjectId")

router.route("/")
.post(verifyToken,photoUpload.single("image"),createPostCtrl)
.get(getAllPostsCtrl);

router.route("/count").get(getPostsCountCtrl)

router.route("/:id").get(validateObjectId,getSinglePostCtrl)
.delete(validateObjectId,verifyToken,DeletePostCtrl)
.put(validateObjectId,verifyToken,updatePostCtrl);

router.route("/update-image/:id")
    .put(validateObjectId,verifyToken,photoUpload.single("image"),updatePostImageCtrl)

router.route("/like/:id")
    .put(validateObjectId,verifyToken,toggleLikeCtrl)
module.exports=router;