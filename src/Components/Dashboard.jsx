import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";
import PatientCard from "./PatientCard";
export default function Dashboard() {
  return (
    <ProfilePage>
      <PatientCard />
    </ProfilePage>
  );
}
