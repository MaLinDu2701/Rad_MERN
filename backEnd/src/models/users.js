import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  userType: {
    type: String,
  },
  userName: {
    type: String,
  },
  userId: {
    type: String,
  },
  email: {
    type: String,
  },
  tokens: {
    accessToken: String,
    password: String,
  },
  createdDate: {
    type: Date,
  },
  updatedDate: {
    type: Date,
  },
});

const userData = mongoose.model("User", usersSchema);

export { userData };
