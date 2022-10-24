"use strict";

import { userData as Users } from "../../models/users.js";
import { courseData as Courses } from "../../models/courses.js";
import { studentData as Students } from "../../models/students.js";
import { lectureData as Lectures } from "../../models/lectures.js";

export const addUsers = async (req, res, next) => {
  const userData = req.body;

  if (userData.studentName) {
    const user = new Users();
    user.set({
      userName: userData.studentName,
      userType: "student",
      email: userData.email,
      "tokens.password": userData.password,
    });
    const student = new Students();
    student.set(userData);
    await student.save();
    const config = await user.save();
    console.log(config);
    if (config.userName == userData.studentName) {
      res.status(200).send({
        message: "User Created",
      });
    } else {
      res.status(500).send({
        message: "User Creation failed! Plz try again",
      });
    }
  } else if (userData.lectureName) {
    const user = new Users();
    user.set({
      userName: userData.lectureName,
      userType: "lecture",
      email: userData.email,
      "tokens.password": userData.password,
    });
    const lecture = new Lectures();
    lecture.set(userData);
    await lecture.save();
    const config = await user.save();
    console.log(config);
    if (config.userName == userData.lectureName) {
      res.status(200).send({
        message: "User Created",
      });
    } else {
      res.status(500).send({
        message: "User Creation failed! Plz try again",
      });
    }
  } else {
    res.status(422).send({
      message: "Invalid Or empty User Data!",
    });
  }
};

export const viewUsers = async (req, res, next) => {
  const user = req.header("userType");
  if (!user)
    res.status(422).send({
      message: "User Type not Defined",
    });
  const users = await Users.find({ userType: user });

  if (users) {
    res.status(200).send(users);
  } else {
    res.status(404).send({
      message: "Not Found",
    });
  }
};



export const viewUser = async (req, res, next) => {
  const id = req.params.id;
  const header = req.header("userType");

  if (!id) return res.status(422).send({ message: "userId is missing" });
  if (header === "lecture") {
    const user = await Users.findById(id);
    if (user) {
      const email = user.email;
      const userDetails = await Lectures.findOne({ email: email });
      console.log(userDetails)
      res.status(200).send(userDetails);
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  } else {
    const user = await Users.findById(id);
    if (user) {
      const email = user.email;
      const userDetails = await Students.findOne({ email: email });
      res.status(200).send(userDetails);
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  }
};

export const editUser = async (req, res, next) => {
  const id = req.params.id;
  const userData = req.body;
  console.log(userData)
  if (!id) return res.status(422).send({ message: "userId is missing" });
  const user = await Users.findById(id);
  if (userData.type === "lecture") {
    if (user) {
      const lectureDetails = await Lectures.findOne({ email: user.email });
      const verifyUpdate = await lectureDetails.updateOne(userData);
      if (verifyUpdate.nModified !== 0) {
        return res.status(200).send({
          message: "User Details Updated",
        });
      }
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  } else {
    if (user) {
      const studentData = await Students.findOne({ email: user.email });
      const verifyUpdate = await studentData.updateOne(userData);
      if (verifyUpdate.nModified !== 0) {
        return res.status(200).send({
          message: "User Details Updated",
        });
      }
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.status(422).send({ message: "userId is missing" });

  const user = await Users.deleteOne({ _id: id });
  if (user.deletedCount !== 0) {
    res.status(200).send({
      message: "User Deleted",
    });
  } else {
    res.status(500).send({
      message: "User not deleted! Plz try again later",
    });
  }
};

export const addCourse = async (req, res, next) => {
  const courseData = req.body;
  if (courseData.courseName) {
    const course = new Courses();
    course.set(courseData);
    const config = await course.save();
    if (config.courseName === courseData.courseName) {
      res.status(200).send({
        message: "Course Created",
      });
    } else {
      res.status(500).send({
        message: "Course Creation failed! Plz try again",
      });
    }
  }
};

export const viewCourses = async (req, res, next) => {
  const courses = await Courses.find();
  if (courses) {
    res.status(200).send(courses);
  } else {
    res.status(404).send({
      message: "Not Found",
    });
  }
};

export const viewCourse = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.status(422).send({ message: "Course is missing" });

  const course = await Courses.findById(id);
  if (course) {
    res.status(200).send(course);
  } else {
    res.status(404).send({
      message: "course not found",
    });
  }
};

export const editCourse = async (req, res, next) => {
  const id = req.params.id;
  const courseData = req.body;
  if (!id) return res.status(422).send({ message: "userId is missing" });

  const course = await Courses.findById(id);
  if (course) {
    const verifyUpdate = await course.updateOne(courseData);
    if (verifyUpdate.nModified !== 0) {
      return res.status(200).send({
        message: "Course Details Updated",
      });
    }
  } else {
    res.status(404).send({
      message: "course not found",
    });
  }
};

export const deleteCourse = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.status(422).send({ message: "Course Id is missing" });

  const user = await Courses.deleteOne({ _id: id });
  if (user.deletedCount !== 0) {
    res.status(200).send({
      message: "Course Removed",
    });
  } else {
    res.status(500).send({
      message: "Course not deleted! Plz try again later",
    });
  }
};
