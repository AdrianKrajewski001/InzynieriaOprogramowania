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
          .filter(pres => pres.data().doctorEmail === email)
          .map(temp => temp.data());
      })
      .then(res => {
        console.log(res);
        setList(res);
      });
  };
  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <div>
      <h1 className="text-4xl">Wizyty</h1>
      <div className="overflow-y-auto h-1/3">
        {list.map(appointment => {
          return (
            <>
              <div className="p-8  sm:w-full md:w-1/2 lg:w-1/4 border-2">
                <p className="text-sm">
                  <b>{appointment.doctorName}</b>
                </p>
                <p>{appointment.specjalizacja}</p>
                <p className="text-sm">{appointment.date}</p>
                <p>
                  {appointment.accepted
                    ? "Zaakceptowane"
                    : "Oczekuje na akceptacje"}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
