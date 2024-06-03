const mongoose=require("mongoose");

module.exports=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_CLOUD_URI)
        console.log("connected to DB")
    } catch (error) {
        console.log("failed to connect to DB",error)
    }
}