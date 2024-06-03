const express = require("express");
const connectToDb = require("./config/connectToDB");
const xss = require("xss-clean");
const rateLimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const { errorHandler, notFound } = require("./middlewares/error");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Connect to DB
connectToDb();

// Init app
const app = express();

// Middlewares
app.use(express.json());

// Security Headers
app.use(helmet());

// Prevent Http Param Pollution 
app.use(hpp());

// Prevent XSS
app.use(xss());

// Rate limiting
app.use(rateLimiting({
    windowMs: 10 * 60 * 1000, // 10min
    max: 200,
}));

// CORS policy
const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? ['https://inkflowhub-1.onrender.com'] 
    : ['http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Routes
app.use("/api/auth", require("./route/authRoute"));
app.use("/api/users", require("./route/usersRoute"));
app.use("/api/posts", require("./route/postRoute"));
app.use("/api/comments", require("./route/commentsRoute"));
app.use("/api/categories", require("./route/categoriesRoute"));
app.use("/api/password", require("./route/passwordRoute"));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Please set NODE_ENV to production');
    });
}

// Error handler middleware (always after routes)
app.use(notFound);
app.use(errorHandler);

// Running the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
