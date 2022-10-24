import express from "express";
const router = express();

import passport from "passport";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config/key.js";
import {  register } from '../controller/authController.js'



// router.post('/auth/loging', passport.authenticate('jwt',{session:false}));
router.post('/auth/register', register);

router.get("/auth/user", (req, res) => {
    const data = req.user
    console.log(req.body)
    if(data.userType === 'lecture' ||  data.userType === 'admin' )res.send({userType: "auth"})
    ; // The req.user stores the entire user that has been authenticated inside of it.
  });

router.post("/auth/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.status(422).send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send({message:"Successfully Authenticated",user:user});

        });
      }
    })(req, res, next);
  });

export { router };