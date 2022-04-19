import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/core/Home';
import Signup from './components/user/Signup';
import Signin from './components/auth/Signin';
import EditProfile from './components/user/EditProfile';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/auth/PrivateRoute';
import Menu from './components/core/Menu.js';
import NewCourse from './components/course/NewCourse';
import Course from './components/course/Course'
import EditCourse from './components/course/EditCourse';
import MyCourses from './components/course/MyCourses';
import Enrollment from './components/enrollment/Enrollment';

function App() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user/:userId" element={<Profile/>} />
        <Route path="/course/:courseId" component={Course} />

        <Route element={<ProtectedRoute/>}>
          <Route path="/user/edit/:userId" element={<EditProfile/>} />
          <Route path="/teach/courses" element={<MyCourses/>} />
          <Route path="/teach/course/new" element={<NewCourse/>} />
          <Route  path="/teach/course/edit/:courseId" element={<EditCourse/>} />
          <Route  path="/teach/course/:courseId" element={<Course/>} />
          <Route  path="/learn/:enrollmentId" element={<Enrollment/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
