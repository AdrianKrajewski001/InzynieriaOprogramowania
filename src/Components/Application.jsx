import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserProvider from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";
import { UserContext } from "../providers/UserProvider";
import PasswordReset from "./PasswordReset";
import Doctors from "./Doctors";
import Prescriptions from "./Prescriptions";
import Calendar from "./Calendar";
import Reports from "./Reports";
import Search from "./Search";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Recepta from "./Recepta";
function Application() {
  const user = useContext(UserContext);
  return user ? (
    <Router>
      <Dashboard path="/" />
      <Doctors path="/doctors" />
      <Prescriptions path="/prescriptions" />
      <Calendar path="/calendar" />
      <Reports path="/reports" />
      <Search path="/search" />
      <Settings path="/settings" />
      <Recepta path="/recepta" />
    </Router>
  ) : (
    <Router>
      <SignUp path="signUp" />
      <SignIn path="/" />
      <PasswordReset path="passwordReset" />
    </Router>
  );
}

export default Application;
