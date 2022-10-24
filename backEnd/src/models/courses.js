import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
  },
  description: {
    type: String,
  },
  courseField: {
    type: String,
  },
  courseId: {
    type: String,
  },
  duration: {
    type: String,
  },
  instructorName: {
    type: String,
  },
  enrolledStudents: [{ studentName: String }],
  createdDate: {
    type: Date,
  },
  updatedDate: {
    type: Date,
  },
});

const courseData = mongoose.model("Course", courseSchema);

export { courseData };
