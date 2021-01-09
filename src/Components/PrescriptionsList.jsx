import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { firestore } from "../firebase";

export default function PrescriptionsList() {
  const user = useContext(UserContext);
  const { photoURL, displayName, email, userType } = user;
  const [list, setList] = useState([]);
  const getPrescriptions = async () => {
    return await firestore
      .collection("Recepty")
      .get()
      .then(presList => {
        return presList.docs
          .filter(pres => pres.data().email === email)
          .map(temp => temp.data());
      })
      .then(res => setList(res));
  };
  useEffect(() => {
    getPrescriptions();
  }, []);
  return (
    <div>
      <h1 className="text-4xl p-6">RECEPTY</h1>
      <div className="flex flex-wrap content-start ">
        {list.map(prescription => {
          let fullDate = new Date(prescription.date).toLocaleDateString();
          return (
            <>
              <div className="p-8  sm:w-full md:w-1/2 lg:w-1/4">
                <div className="p-4 max-w-xs bg-gray-200 border-4 rounded-lg">
                  <h4 className="text-2xl">
                    <b>{prescription.name}</b>
                  </h4>
                  <h6>PESEL: {prescription.PESEL}</h6>
                  <h6>Data wydania: {fullDate}</h6>
                  <br></br>
                  <h3>
                    <b>Leki:</b>
                  </h3>
                  <h6 className="text-md">{prescription.prescription}</h6>
                  <br></br>
                  <h6 className="text-md">Wydał: {prescription.doctorName}</h6>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
