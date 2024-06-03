const router=require("express").Router();
const { createCommentCtrl, getAllCommentCtrl, deleteCommentCtrl, updateCommentCtrl } = require("../controllers/commentsController");
const {verifyToken,verifyTokenAndAdmin}=require("../middlewares/verifyToken")
const {}=require("../middlewares/validateObjectId");
const validateObjectId = require("../middlewares/validateObjectId");

router.route("/").post(verifyToken,createCommentCtrl)
    .get(verifyTokenAndAdmin,getAllCommentCtrl)

router.route("/:id")
.delete(validateObjectId,verifyToken,deleteCommentCtrl)
.put(validateObjectId,verifyToken,updateCommentCtrl)


module.exports=router;