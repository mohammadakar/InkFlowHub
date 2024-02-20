const express=require("express")
const connectToDb=require("./config/connectToDB");
const xss =require("xss-clean")
const rateLimiting=require("express-rate-limit")
const helmet=require("helmet")
const hpp=require("hpp")
const { errorHandler, notFound } = require("./middlewares/error");
const cors=require("cors");
require("dotenv").config();
//connect to DB
connectToDb();
//init app
const app=express();

//middlewares
app.use(express.json());

//security Headers
app.use(helmet());

//prevent Http Param Pollution 
app.use(hpp());

//prevent XSS
app.use(xss());

//rate limiting
app.use(rateLimiting({
    windowMs:10 * 60 * 1000, //10min
    max:200,
}));

//cors policy
app.use(cors({
    origin:"http://localhost:3000"
}));

//routes
app.use("/api/auth",require("./route/authRoute"))
app.use("/api/users",require("./route/usersRoute"))
app.use("/api/posts",require("./route/postRoute"))
app.use("/api/comments",require("./route/commentsRoute"))
app.use("/api/categories",require("./route/categoriesRoute"))
app.use("/api/password",require("./route/passwordRoute"))
//error handler middleware (always after routes)
app.use(notFound)
app.use(errorHandler)

//running the server
const PORT=process.env.PORT
app.listen(PORT,()=>console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))