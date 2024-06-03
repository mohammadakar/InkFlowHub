const router=require("express").Router();
const { createCategoryCtrl, getAllCategoryCtrl, deleteCategoryCtrl } = require("../controllers/categoriesController");
const {verifyTokenAndAdmin}=require("../middlewares/verifyToken")
const validateObjectId=require("../middlewares/validateObjectId")



router.route("/").post(verifyTokenAndAdmin,createCategoryCtrl)
    .get(getAllCategoryCtrl);

router.route("/:id").delete(validateObjectId,verifyTokenAndAdmin,deleteCategoryCtrl)






module.exports=router;