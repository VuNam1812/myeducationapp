import "./App.scss";
import React, { useContext, useEffect, useState } from "react";
import $ from "jquery";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { Loader } from "./containers/loader/loader";
import {
  Home,
  Login,
  Register,
  Courses,
  CourseDetail,
  CourseLession,
  InstructorDetail,
  StudentProfile,
  TeacherProfile,
  AdminProfile,
  Payment,
} from "./containers/pages";
import { authContext } from "./contexts/auth/authContext";
function App() {
  const { store_auth, checkAuth } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    (async () => {
      await checkAuth();
      setLoading(true);
    })();
  }, []);

  return (
    <div className="App">
      {!loading ? (
        <Loader></Loader>
      ) : (
        <Switch>
          <Route path="/register">
            {store_auth.auth ? (
              <Redirect to="/"></Redirect>
            ) : (
              <Register></Register>
            )}
          </Route>
          <Route path="/login">
            {store_auth.auth ? <Redirect to="/"></Redirect> : <Login></Login>}
          </Route>
          <Route path="/search">
            <Courses></Courses>
          </Route>
          <Route path="/courses">
            <Switch>
              <Route exact path="/courses">
                <Courses></Courses>
              </Route>
              <Route path="/courses/:courId">
                <CourseDetail></CourseDetail>
              </Route>
            </Switch>
          </Route>
          <Route exact path="/categories/:catId">
            <Courses></Courses>
          </Route>
          <Route path="/teachers">
            <Switch>
              <Route exact path="/teachers/:teacherId">
                <InstructorDetail></InstructorDetail>
              </Route>
              <Route path="/teachers/dashboard/:accountId">
                {+store_auth.account.permission === 1 ? (
                  <TeacherProfile></TeacherProfile>
                ) : (
                  <Redirect to="/"></Redirect>
                )}
              </Route>
            </Switch>
          </Route>
          <Route exact path="/payment/:courId">
            {store_auth.auth ? (
              <Payment></Payment>
            ) : (
              <Redirect to="/login"></Redirect>
            )}
          </Route>
          <Route exact path="/lessions/:courId/:lessionId">
            <CourseLession></CourseLession>
          </Route>
          <Route path="/admins/:adminId">
            {+store_auth.account.permission === 0 && store_auth.auth ? (
              <AdminProfile></AdminProfile>
            ) : (
              <Redirect to="/"></Redirect>
            )}
          </Route>
          <Route path="/accounts/:accountId">
            {store_auth.auth ? (
              <StudentProfile></StudentProfile>
            ) : (
              <Redirect to="/"></Redirect>
            )}
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
