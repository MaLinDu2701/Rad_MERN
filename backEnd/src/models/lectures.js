import mongoose from "mongoose";

const lecturesSchema = new mongoose.Schema({
  lectureName: {
    type: String,
  },
  userId:{
    type: String
  },
  email: {
    type: String,
  },
  degree: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  createdDate: {
    type: Date,
  },
  updatedDate: {
    type: Date,
  },
});

const lectureData = mongoose.model("lecture", lecturesSchema);

export { lectureData };
