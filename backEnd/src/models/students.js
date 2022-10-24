import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
  },
  userId:{
      type: String
  },
  email: {
    type: String,
  },
  indexNo: {
    type: String
  },
  dateOfBirth: {
    type: String
  },
  field: {
    type: String
  },
  createdDate: {
    type: Date,
  },
  updatedDate: {
    type: Date,
  },
});

const studentData = mongoose.model("Student", studentSchema);

export { studentData };
