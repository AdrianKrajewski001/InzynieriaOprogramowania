import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { firestore } from "../firebase";

export default function Appointments() {
  const user = useContext(UserContext);
  const { photoURL, displayName, email, userType } = user;
  const [list, setList] = useState([]);
  const getAppointments = async () => {
    return await firestore
      .collection("appointments")
      .get()
      .then(presList => {
        return presList.docs
          .filter(
            pres =>
              pres.data().doctorEmail === email ||
              pres.data().patientEmail === email
          )
          .map(temp => {
            return Object.assign(temp.data(), { id: temp.id });
          });
      })
      .then(res => {
        console.log(res);
        setList(res);
      });
  };
  const setAppointment = (id, field, action) => {
    console.log(id);
    firestore
      .collection("appointments")
      .doc(id)
      .update({
        [field]: action,
        done: true
      });
  };
  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <div>
      <h1 className="text-4xl">Wizyty</h1>
      <div className="overflow-y-auto">
        {list.map((appointment, counter) => {
          return (
            <>
              <div
                className={
                  "p-8  sm:w-full md:w-1/2 lg:w-1/4 border-2 border-b-0" +
                  (appointment.accepted ? "bg-green-300" : "bg-yellow-300")
                }
              >
                <p className="text-sm">{appointment.date}</p>
                <p className="text-sm">
                  {user.userType === "Doctor" ? (
                    <b>{appointment.patientName}</b>
                  ) : (
                    <b>{appointment.doctorName}</b>
                  )}
                </p>
                {userType === "Patient" ? (
                  <>
                    {" "}
                    <p>{appointment.specjalizacja.toString().toUpperCase()}</p>
                    <p>
                      Adres: {appointment.doctorStreet},{appointment.doctorCity}
                    </p>
                  </>
                ) : (
                  <p>Wiek : {appointment.patientAge}</p>
                )}

                <p>
                  {appointment.accepted ? "Zaakceptowane" : ""}
                  {!appointment.accepted && appointment.done ? "Anulowano" : ""}
                  {!appointment.accepted && !appointment.done
                    ? "Oczekuje na akceptacje"
                    : ""}
                </p>
                {user.userType === "Doctor" && appointment.done === false ? (
                  <>
                    <button
                      className="m-5 ml-0 border border-black"
                      onClick={async () => {
                        await setAppointment(appointment.id, "accepted", true);
                        getAppointments();
                      }}
                    >
                      Akceptuj
                    </button>
                    <button
                      className="border border-black"
                      onClick={async () => {
                        await setAppointment(appointment.id, "accepted", false);
                        getAppointments();
                      }}
                    >
                      Anuluj
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
