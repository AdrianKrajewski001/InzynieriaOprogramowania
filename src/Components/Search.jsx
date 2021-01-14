import React, { useState } from "react";
import { firestore } from "../firebase";
import Map from "./Map";
const Search = () => {
  let Specialization = [];
  let Doctor = [];

  const [doctorsList, setDoctorsList] = useState([]);
  const [doctors, SetDoctors] = useState(Doctor);
  const [filteredUsers, setUsers] = useState(Specialization);

  const downloadSpecializationsFromDatabase = async () => {
    Specialization = [];
    const citiesRef = firestore.collection("Lekarze");
    const snapshot = await citiesRef
      .where(
        "Objawy",
        "array-contains",
        document.getElementById("textbox").value
      )
      .get();
    if (snapshot.empty) {
      // console.log("No matching documents.");
      return;
    }

    snapshot.forEach(async doc => {
      // console.log(doc.id, "=>", doc.data());
      await Specialization.push(doc.id);

      downloadDoctorsfromDatabase();
    });
  };

  const listItems = Specialization.map(number => (
    <li key={number.toString()}> {number}</li>
  ));

  const downloadDoctorsfromDatabase = async () => {
    const citiesRef = firestore.collection("users");
    const snapshot = await citiesRef
      .where("specjalizacja", "array-contains", Specialization[0]) //do poprawy
      .get();
    if (snapshot.empty) {
      // console.log("No matching documents.");
      return;
    }
    let temp = [];
    snapshot.forEach(async doc => {
      // console.log(doc.id, "=>", doc.data());
      let x = doc.data();

      await temp.push(x);

      await Doctor.push(x.displayName);
    });
    await setDoctorsList(temp);
    setUsers(Specialization);
    SetDoctors(Doctor);
  };

  function UsersList({ users }) {
    if (users.length > 0) {
      return (
        <ul>
          {doctorsList.map(user => (
            <li
              className="hover:bg-gray-600 border-b-2 pb-2 mb-2"
              key={user.displayName}
            >
              {user.displayName} - {user.specjalizacja.toString().toUpperCase()}
              <div className="text-gray-200 text-xs">
                {user.street}, {user.city}
              </div>
              <p>Najblizszy terminy: </p>
            </li>
          ))}
        </ul>
      );
    }

    return <p></p>;
  }

  return (
    <Map doctorsList={doctorsList}>
      <div style={{ position: "absolute", zIndex: "5" }}>
        <div className="p-4 max-w-xs text-white bg-gray-800 border-4 border-t-0 border-l-0 rounded-l-none rounded-tr-none rounded-lg">
          <input
            className="border border-blue-400 mr-2 text-black uppercase"
            id="textbox"
          />

          <button
            className=" font-bold"
            onClick={() => downloadSpecializationsFromDatabase()}
          >
            SZUKAJ
          </button>

          <div>
            <b>Lista lekarzy:</b>
          </div>
          <UsersList users={doctors} />
        </div>
      </div>
    </Map>
  );
};

export default Search;
