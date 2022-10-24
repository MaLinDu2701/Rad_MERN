import passport from "passport";
import { userData as Users } from "../models/users.js";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (user, cd) => {
  const results = await Users.findOne({ email: user.email });

  cd(null, results);
});

passport.use(
  new Strategy(
    {
      usernameField: "email", // define the parameter in req.body that passport can use as username and password
      passwordField: "password",
    },
    (email, password, cb) => {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return Users.findOne({ email: email })
        .then((user) => {
          if (!user) return cb(null, false);
          if (user.tokens.password === password) {
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        })
        .catch((err) => cb(err, { message: "Incorrect email or password." }));
    }
  )
);

// passport.use(new JWTStrategy({
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey   : 'your_jwt_secret'
// },
// function (jwtPayload, cb) {
//   return cb(() => {
//     console.log(jwtPayload)
//   })

//   //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//   // return UserModel.findOneById(jwtPayload.id)
//   //     .then(user => {
//   //         return cb(null, user);
//   //     })
//   //     .catch(err => {
//   //         return cb(err);
//   //     });
// }
// ));
