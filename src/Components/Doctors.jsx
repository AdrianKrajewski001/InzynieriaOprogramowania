import React from "react";
import ProfilePage from "./ProfilePage";
import Search from "./Search";
export default function Doctors() {
  return (
    <ProfilePage active="/doctors">
      <Search />
    </ProfilePage>
  );
}
