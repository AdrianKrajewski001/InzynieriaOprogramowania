import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";

export default function PatientCard() {
  const user = useContext(UserContext);
  const { photoURL, displayName, email, userType } = user;

  return (
    <div className="p-8">
      <div className="p-4 max-w-xs bg-gray-200 border-4 rounded-lg">
        <img
          className="h-24 w-24 mb-4 rounded-lg"
          src={
            photoURL ||
            "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg"
          }
          alt="User Picture"
        ></img>
        <h4 className="text-2xl">{displayName}</h4>
        <h6 className="text-md">{email}</h6>
        <h6>{userType}</h6>
      </div>
    </div>
  );
}
