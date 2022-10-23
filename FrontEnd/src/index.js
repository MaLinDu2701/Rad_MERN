
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const Courses = lazy(() => import("./views/admin/courses/AddCourses"));

const AddLecture = lazy(() => import("./views/admin/lectures/AddLecture"));
const GetLecture = lazy(() => import("./views/admin/lectures/GetLectures"));
const ManageLecture = lazy(() => import("./views/admin/lectures/ManageLecture"));


const AddStudent = lazy(() => import("./views/admin/students/AddStudent"));
const GetStudents = lazy(() => import("./views/admin/students/GetStudents"));
const ManageStudent = lazy(() => import("./views/admin/students/ManageStudent"));

const CourseManger = lazy(() => import('./views/admin/courses/CourseManager'));

const CreateForum = lazy(() => import("./views/admin/lectures/CreateForum"));

const GetForum = lazy(() => import("./views/forum/GetForum"));

const CommentsManager = lazy(() => import("./views/student/AddComment"));
const id = localStorage.getItem("userId")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin"  render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
           
      {/* Courses router */}
      {id &&    <Suspense>
      <Route path="/course-edit/:id" component={CourseManger} />
        <Route path="/course/new-course" component={Courses} />
       
        {/* Student Routers */}
        <Route path="/student/new-student" component={AddStudent} />
        <Route path="/users/student" component={GetStudents} />
        <Route path="/users/student-manage/:id" component={ManageStudent} />

        {/* Lecture Routers */}
        <Route path="/lecture/new-lecture" component={AddLecture} />
        <Route path="/users/lecture" component={GetLecture} />
        <Route path="/lecture/new-forum" component={CreateForum} />
        <Route path="/users/lecture-manage/:id" component={ManageLecture} />

        {/* Forum Routes */}
        <Route path="/forums/" component={GetForum} />
        <Route path="/lecture/forum-manage/:id" component={CommentsManager} />
    
      </Suspense> }
   

      <Redirect from="/" to="/admin/index" />
     
    </Switch>
  </BrowserRouter>
);
