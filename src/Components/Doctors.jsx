import React from "react";
import ProfilePage from "./ProfilePage";
import Search from "./Search";
import Map from "./Map";
export default function Doctors() {
  return (
    <ProfilePage active="/doctors">
      <Search />
      {/* <Map /> */}
    </ProfilePage>
  );
}
