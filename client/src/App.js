import './App.css';
import React from 'react';
import { Route, Switch, Router, Routes } from 'react-router-dom';
import Home from './components/core/Home';
import Users from './components/user/Users';
import Signup from './components/user/Signup';
import Signin from './components/auth/Signin';
import EditProfile from './components/user/EditProfile';
import Profile from './components/user/Profile';
import PrivateRoute from './components/auth/PrivateRoute';
import Menu from './components/core/Menu.js';
import NewCourse from './components/course/NewCourse';
//import Courses from './course/Courses'
import Course from './components/course/Course';
import EditCourse from './components/course/EditCourse';
import MyCourses from './components/course/MyCourses';
import Enrollment from './components/enrollment/Enrollment';

function App() {
  return (
    <div>
      {/* {' '} */}
      {/* <Menu /> */}
      {/* <h1>kuch to chal na bhadwe</h1> */}
      <Routes>
        {/* <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />
        <Route path="/course/:courseId" component={Course} />
        <PrivateRoute path="/teach/courses" component={MyCourses} />

        <PrivateRoute path="/teach/course/new" component={NewCourse} />
        <PrivateRoute
          path="/teach/course/edit/:courseId"
          component={EditCourse}
        />
        <PrivateRoute path="/teach/course/:courseId" component={Course} />
        <PrivateRoute path="/learn/:enrollmentId" component={Enrollment} /> */}
      </Routes>
    </div>
  );
}

export default App;
