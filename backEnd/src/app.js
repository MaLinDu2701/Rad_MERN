import express from "express";
import Mongoose from "mongoose";
import bodyParser from "body-parser";
import { Mongo_Url } from "./config/key.js";
import "./config/passport.js";
import cookieSession from 'express-session';
import passport from "passport";
import cookieParser from 'cookie-parser';

import cors from "cors";

const app = express();
app.use(bodyParser.json());
//middelware
app.use(cors({
}));


app.use(cookieSession({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true,
}))
app.use(cookieParser("secretcode"));
//initalize passport
app.use(passport.initialize());
app.use(passport.session());

import { router as admin } from "./api/router/admin.js";
import { router as lecture } from "./api/router/lecture.js";
import { router as student } from "./api/router/student.js";
import { router as auth } from "./api/router/auth.js";

//routers

app.use("/api/v1/admin", admin);
app.use("/api/v1/", lecture);
app.use("/api/v1/", student);
app.use("/api/v1/", auth);

// Database Mongodb connection
Mongoose.connect(
  Mongo_Url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (!error) {
      console.log("Success");
    } else {
      console.log(error);
    }
  }
);

export default app;
