import express from "express";
const router = express();
import { addUsers, viewUsers, viewUser, editUser, deleteUser, addCourse, viewCourses, viewCourse, editCourse, deleteCourse } from "../controller/adminController.js";



router.post("/user", addUsers);
router.get("/users", viewUsers);
router.get("/user/:id", viewUser);
router.put("/user/:id", editUser);
router.delete("/user/:id", deleteUser);




router.post("/course", addCourse);
router.get("/courses", viewCourses);
router.get("/course/:id", viewCourse);
router.put("/course/:id", editCourse);
router.delete("/course/:id", deleteCourse);


export { router };
