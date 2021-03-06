import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import { auth, signInWithGoogle, generateUserDocument } from "../firebase";
import { navigate } from "@reach/router/lib/history";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      setError("Error Signing up with email and password");
    }

    setEmail("");
    setPassword("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Zarejestruj się</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className="">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="Email"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Hasło:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Hasło"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />

          <button
            className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white"
            onClick={async event => {
              await createUserWithEmailAndPasswordHandler(
                event,
                email,
                password
              );
              await sleep(1000);
              navigate("/init");
            }}
          >
            Zarejestruj się
          </button>
        </form>
        <p className="text-center my-3">lub</p>
        <button
          onClick={async () => {
            try {
              signInWithGoogle();
              await sleep(1000);
              navigate("/init");
            } catch (error) {
              console.error("Error signing in with Google", error);
            }
          }}
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
        >
          Konto Google
        </button>
        <p className="text-center my-3">
          Posiadasz konto?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Zaloguj sie tutaj
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
