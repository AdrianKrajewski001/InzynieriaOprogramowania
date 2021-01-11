import React, { useContext } from "react";
import ProfilePage from "./ProfilePage";
import Recepta from "./Recepta";
import PrescriptionsList from "./PrescriptionsList";
import { UserContext } from "../providers/UserProvider";

export default function Prescriptions() {
  const user = useContext(UserContext);
  let { userType } = user;
  return (
    <ProfilePage active="/prescriptions">
      {userType === "Doctor" ? <Recepta /> : <PrescriptionsList />}
    </ProfilePage>
  );
}
