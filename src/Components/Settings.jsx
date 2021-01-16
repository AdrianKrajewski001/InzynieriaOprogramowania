import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";
import { firestore } from "../firebase";
import { database } from "../firebase";
export default function Settings() {
  const user = useContext(UserContext);
  const {
    photoURL,
    displayName,
    email,
    userType,
    age,
    street,
    city,
    uid,
    specjalizacja
  } = user;
  const [email_, setEmail] = useState(email);
  const [photoURL_, setPhotoURL] = useState(photoURL);
  const [displayName_, setDisplayName] = useState(displayName);
  const [userType_, setUserType] = useState(userType);
  const [age_, setAge] = useState(age);
  const [street_, setStreet] = useState(street);
  const [city_, setCity] = useState(city);
  const [specjalizacja_, setSpecjalizacja] = useState(specjalizacja);

  const uploadChanges = e => {
    e.preventDefault();
    firestore
      .collection("users")
      .doc(uid)
      .set({
        displayName: displayName_,
        email: email,
        userType: userType_,
        age: age_,
        street: street_,
        city: city_,
        photoURL: photoURL_
      });
    alert("Changes saved");
  };
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    } else if (name === "userType") {
      setUserType(value);
    } else if (name === "city") {
      setCity(value);
    } else if (name === "age") {
      setAge(value);
    } else if (name === "street") {
      setStreet(value);
    } else if (name === "photoURL") {
      setPhotoURL(value);
    }
  };

  return (
    <ProfilePage>
      <div className="mt-8">
        <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
          <form className="" onSubmit={uploadChanges}>
            <label htmlFor="displayName" className="block">
              Display Name:
            </label>
            <input
              type="text"
              className="my-1 p-1 w-full "
              name="displayName"
              value={displayName_}
              placeholder="Name"
              id="displayName"
              onChange={event => onChangeHandler(event)}
            />

            <label htmlFor="userType" className="block">
              Kim jesteś
            </label>

            <input
              checked={userType_ === "Patient" ? true : false}
              type="radio"
              name="userType"
              value="Patient"
              placeholder="Patient"
              id="patient"
              onChange={event => onChangeHandler(event)}
            />
            <label>Pacjent</label>

            <input
              checked={userType_ === "Doctor" ? true : false}
              type="radio"
              name="userType"
              value="Doctor"
              placeholder="Doctor"
              id="doctor"
              onChange={event => onChangeHandler(event)}
              className="ml-4"
            />

            <label>Doktor</label>
            {userType_ === "Patient" ? (
              <>
                <label htmlFor="age" className="block">
                  Age:
                </label>
                <input
                  type="data"
                  className="my-1 p-1 w-full "
                  name="age"
                  value={age_}
                  placeholder="Age"
                  id="age"
                  onChange={event => onChangeHandler(event)}
                />
              </>
            ) : (
              <>
                <label htmlFor="specjalizacja" className="block">
                  Specjalizacja:
                </label>
                <input
                  type="data"
                  className="my-1 p-1 w-full "
                  name="specjalizacja"
                  value={specjalizacja_}
                  placeholder="Specjalizacja"
                  id="specjalizacja"
                  onChange={event => onChangeHandler(event)}
                />
              </>
            )}
            <label htmlFor="street" className="block">
              Address:
            </label>
            <input
              type="text"
              className="my-1 p-1 w-full "
              name="street"
              value={street_}
              placeholder="Street"
              id="street"
              onChange={event => onChangeHandler(event)}
            />
            <label htmlFor="city" className="block">
              City:
            </label>
            <input
              type="text"
              className="my-1 p-1 w-full "
              name="city"
              value={city_}
              placeholder="City"
              id="city"
              onChange={event => onChangeHandler(event)}
            />
            <label htmlFor="city" className="block">
              Photo:
            </label>
            <input
              type="text"
              className="my-1 p-1 w-full "
              name="photoURL"
              value={photoURL_}
              placeholder="photoURL"
              id="photoURL"
              onChange={event => onChangeHandler(event)}
            />
            <button
              className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white"
              type="submit"
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
    </ProfilePage>
  );
}
