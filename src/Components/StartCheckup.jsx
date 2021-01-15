import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";
import {firestore} from "../firebase";
import firebase from 'firebase/app'

const StartCheckup = () => {
  const user = useContext(UserContext);

  const [choroby, setChoroby] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [userselect, setUserSelect] = useState();

  const onChangeHandler = id => () => {
    selected.includes(id)
      ? setSelected(selected.filter(x => x !== id))
      : setSelected([...selected, id]);
  };

  const docRef = firestore.collection("diseases");

  function getChoroby() {
    setLoading(true);
    docRef.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setChoroby(items);
      setLoading(false);
    });
  };

  const arrayUnique = [...new Set(choroby.map(q => q.type))];

  function addCase() {
    const baza = firestore.collection("users").doc(user.uid).collection("cases")

    const array1 = choroby.map((choroba) => (choroba.name));
    const array2 = choroby.map((choroba) => (choroba.type));
    const array1Length = array1.length;
    const selectedLength = selected.length;
    const arrayresult = [];
    let k = 0;

    for (var i = 0; i < array1Length; i++) {
      for (var j = 0; j < selectedLength; j++) {
        if (array1[i] == selected[j]) {
          arrayresult[k] = array2[i];
          k = k+1;
        }
      }
    }

    let b={};
    let max='', maxi=0;
    for(let z of arrayresult) {
      if(b[z]) b[z]++; else b[z]=1;
      if(maxi < b[z]) { max=z; maxi=b[z] }
    }

    baza.add({doctorType: max})
    .then(function(docRef) {
      baza.doc(docRef.id).update({
        listOfDiseases: firebase.firestore.FieldValue.arrayUnion(...selected)
      });
    });
    alert("Dodano objawy");
  };

  useEffect(() => {
    getChoroby()
  }, []);

  function changeView() {
    const e = document.getElementById("showtype");
    const us = e.options[e.selectedIndex].text;
    setUserSelect(us);
  }  

  if (loading) {
    return (
      <ProfilePage>
        <div className="text-center">
          <h1>Loading...</h1>
        </div>
      </ProfilePage>
    );
  };

  return (
    <ProfilePage>
      <div className="text-center">
        <h1>Choroby: &nbsp;&nbsp;&nbsp;
          <select id="showtype" onChange={changeView}>
            <option>---</option>
            {arrayUnique.map((uni) => (
            <option>{uni}</option>
            ))}
          </select>
        </h1>

        {choroby.map((choroba) => ((userselect == null || userselect === "---") ?
          <div key={choroba.id}>
            <input
              type="checkbox"
              checked={selected.includes(choroba.name)}
              onChange={onChangeHandler(choroba.name)}
            />
            &nbsp;
            {choroba.name}
          </div>

          : (userselect === choroba.type) &&
            <div key={choroba.id}>
              <input
                type="checkbox"
                checked={selected.includes(choroba.name)}
                onChange={onChangeHandler(choroba.name)}
              />
              &nbsp;
              {choroba.name}
            </div>
        ))}
        <br />
        <button className="bg-blue-400 hover:bg-blue-500 py-2 px-4 text-white" onClick={addCase}>Dodaj</button>
      </div>
    </ProfilePage>
  );
};

export default StartCheckup;

/*

(abc) ---- kolekcja abc
def ------ dokument def
id: ------ pole id
qwe[] ---- tablica qwe
--------------------------

(diseases)
  bolglowy
    id:
    name:
    type:  //specjalizacja odpowiedniego lekarza

(users)
  uid
    dispalyName:
    email:
    photoURL:
    userType:

    (cases)
      randomid
        doctorType:  //specjalizacja odpowiedniego lekarza
        listOfDiseases[]

*/
