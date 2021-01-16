import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";
import PatientCard from "./PatientCard";
import Appointments from "./Appointments";
export default function Dashboard() {
  return (
    <ProfilePage active="/">
      <div className="flex-1">
        <PatientCard />
        <Appointments />
      </div>
    </ProfilePage>
  );
}
