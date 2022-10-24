import { userData as Users } from "../../models/users.js";
import jwt from "jsonwebtoken";
import bycrptr from "bcryptjs";
const {  genSalt, hash } = bycrptr;
import { TOKEN_SECRET } from "../../config/key.js";

export const loging = async () => {
  //checking if the user is alerady in the database
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is wrong");

  //Password is Correct

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or password is wrong");

  //Create and assign token
  const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};

export const register = async (req, res, next) => {
  const userData = req.body;
  //checking if the user is already in the database
  const emailExist = await Users.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send( { message :"Email already exists" });

  //Hash the password
  const salt = await genSalt(10);
  console.log(userData)
  const hashPassword = await hash(req.body.password, salt);

  if (userData.userType === "student") {
    //create new user
    const user = new Users({
      userType: "student",
      userName: req.body.name,
      email: req.body.email,
      token: {
        password: hashPassword,
      },
    });
    const saveUser = await user.save();
    if(saveUser.userType === userData.userType) {
      res.status(200).send(saveUser);
    } else {
      res.status(500).send({message: "User Not Created"});
    };

  } else if (userData.userType === "lecture") {
    //create new user
    const user = new Users({
      userType: "lecture",
      userName: req.body.name,
      email: req.body.email,
      token: {
        password: hashPassword,
      },
    });
    const saveUser = await user.save();
    if(saveUser.userType === userData.userType) {
      res.status(200).send(saveUser);
    } else {
      res.status(500).send({message: "User Not Created"});
    }
   
  }
};
