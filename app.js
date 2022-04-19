const express = require("express");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const app = express();
const logger = require('morgan');
const cors=require("cors");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const courseRouter = require("./routes/courseRoutes");
const enrollmentRouter = require("./routes/enrollmentRoutes");

const AppError = require("./utils/appError");

app.use(express.json({ limit: "10kb" }));
app.use(logger('dev')); 

app.use(cors());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/api/health", (req, res, next) => {
  res.send("Health Check is working fine!");
});

app.use("/api/auth", authRouter);
app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/enrollment', enrollmentRouter);


app.all("*", async (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    return next(
      new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
    );
  }
  //res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = app;