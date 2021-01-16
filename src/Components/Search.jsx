import React, { useState, useContext } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { firestore } from "../firebase";
import Map from "./Map";
import { create } from "domain";
import { UserContext } from "../providers/UserProvider";

const Search = () => {
  const user = useContext(UserContext);
  const { photoURL, displayName, email, userType, age, street, city } = user;
  let Specialization = [];
  let Doctor = [];

  const [doctorsList, setDoctorsList] = useState([]);
  const [doctors, SetDoctors] = useState(Doctor);
  const [filteredUsers, setUsers] = useState(Specialization);
  const [option, setOption] = useState("");

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

  const createAppointment = (
    doctorEmail,
    doctorName,
    spec,
    date,
    street,
    city
  ) => {
    let data = new Date();
    firestore
      .collection("appointments")
      .doc(data.getTime().toString())
      .set({
        doctorEmail,
        patientEmail: email,
        date,
        done: false,
        accepted: false,
        specjalizacja: spec,
        doctorName,
        patientName: displayName,
        patientAge: age,
        doctorStreet: street,
        doctorCity: city
      });
  };

  function UsersList({ users }) {
    if (users.length > 0) {
      return (
        <ul>
          {console.log(doctorsList)}
          {doctorsList.map(user => (
            <Popup
              trigger={open => (
                <li
                  className="hover:bg-gray-600 border-b-2 pb-2 mb-2"
                  key={user.displayName}
                >
                  {user.displayName} -{" "}
                  {user.specjalizacja.toString().toUpperCase()}
                  <div className="text-gray-200 text-xs">
                    {user.street}, {user.city}
                  </div>
                </li>
              )}
              modal
              nested
            >
              {close => (
                <div className="p-2">
                  <p className="m-2">Lekarz: {user.displayName}</p>
                  <p className="m-2">
                    Specjalizacja: {user.specjalizacja.toString().toUpperCase()}
                  </p>
                  <p className="m-2">
                    Wolny termin:
                    <select
                      name="appointments"
                      id="appointments"
                      form="appointments"
                      onChange={e => {
                        e.preventDefault();
                        setOption(e.target.value);
                      }}
                    >
                      <option value={user.freeAppointment[0]}>
                        Wybierz datę
                      </option>
                      {user.freeAppointment.map(app => {
                        return <option value={app}>{app}</option>;
                      })}
                    </select>
                  </p>
                  <button
                    className="bg-gray-300 rounded-sm p-2 border-black-1 m-4 ml-2"
                    onClick={() => {
                      createAppointment(
                        user.email,
                        user.displayName,
                        user.specjalizacja[0],
                        option,
                        user.street,
                        user.city
                      );
                      close();
                      alert("Wizyta oczekuje na akceptacje lekarza");
                    }}
                  >
                    UMÓW SIĘ NA WIZYTĘ
                  </button>
                </div>
              )}
            </Popup>
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
