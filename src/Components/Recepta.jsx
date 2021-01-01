import React, { Component, useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import {
  auth,
  signInWithGoogle,
  generateUserDocument,
  firestore
} from "../firebase";
import { UserContext } from "../providers/UserProvider";
import { database } from "../firebase";

const Recepta = () => {
  const user = useContext(UserContext);
  const [email, setEmail] = useState("");

  const [displayName, setDisplayName] = useState("Test");
  const [date, setDate] = useState("");
  const [prescription, setprescription] = useState("");
  const [PESEL, setPESEL] = useState("");
  const [error, setError] = useState(null);
  let data = new Date();

  const sendData = () => {
    if (
      PESEL.length == 11 &&
      onlyDigits(PESEL) == true &&
      [displayName && prescription && email] != ""
    ) {
      writeUserData();
    } else setError("Dane nieprawidlowe");
  };

  function onlyDigits(s) {
    for (let i = s.length - 1; i >= 0; i--) {
      const d = s.charCodeAt(i);
      if (d < 48 || d > 57) return false;
    }
    return true;
  }

  const writeUserData = async () => {
    {
      firestore
        .collection("Recepty")
        .doc(data.getTime().toString())
        .set({
          name: displayName,
          email: email,
          prescription: prescription,
          PESEL: PESEL,
          DoktorID: user.uid
        });
    }
    setError("Wyslano");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "email") {
      setEmail(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    } else if (name === "prescription") {
      setprescription(value);
    } else if (name === "PESEL") {
      setPESEL(value);
    }
  };

  return (
    <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
      {error !== null && (
        <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
          {error}
        </div>
      )}

      <label>E-mail</label>
      <input
        type="text"
        className="my-1 p-1  border border-red-400 w-full"
        name="email"
        value={email}
        placeholder="Email"
        id="email"
        onChange={event => onChangeHandler(event)}
      />

      <label>Imię i Nazwisko</label>
      <input
        type="text"
        className="my-1 p-1  border border-red-400 w-full"
        name="displayName"
        value={displayName}
        placeholder="Name"
        id="displayName"
        onChange={event => onChangeHandler(event)}
      />

      <label>PESEL</label>
      <input
        type="text"
        className="my-1 p-1  border border-red-400 w-full"
        name="PESEL"
        value={PESEL}
        placeholder="PESEL"
        id="PESEL"
        onChange={event => onChangeHandler(event)}
      />

      <label>Recepta</label>
      <textarea
        type="text"
        className="my-1 p-1  border border-red-400 w-full"
        name="prescription"
        value={prescription}
        placeholder="prescription"
        id="prescription"
        onChange={event => onChangeHandler(event)}
      />
      <button className="border border-red-400" onClick={() => sendData()}>
        Wyślij
      </button>
    </div>
  );
};

export default Recepta;
