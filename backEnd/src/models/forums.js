import mongoose from "mongoose";

const forumsSchema = new mongoose.Schema({
  lectureName: {
    type: String,
  },
  forumName: {
    type: String,
  },
  description: {
    type: String,
  },
  comments: [
    {
      studentName: String,
      indexNo: String,
      description: String,
    },
  ],

  createdDate: {
    type: Date,
  },
  updatedDate: {
    type: Date,
  },
});

const forumData = mongoose.model("forums", forumsSchema);

export { forumData };
