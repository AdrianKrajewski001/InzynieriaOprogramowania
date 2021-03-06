import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { navigate, Link } from "@reach/router";
import { auth } from "../firebase";
const ProfilePage = props => {
  const user = useContext(UserContext);
  const { photoURL, displayName, email, userType } = user;

  return (
    <>
      <div>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="./doctor.png"
                    alt="Workflow"
                  ></img>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link to="/">
                      <a
                        href="#"
                        className={
                          " text-white px-3 py-2 rounded-md text-sm font-medium " +
                          (props.active == "/" ? "bg-gray-700" : "")
                        }
                      >
                        Dashboard
                      </a>
                    </Link>
                    <Link to="/startcheckup">
                      <a
                        href="#"
                        className={
                          " text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium " +
                          (props.active == "/startcheckup" ? "bg-gray-700" : "")
                        }
                      >
                        Start checkup
                      </a>
                    </Link>
                    {userType === "Patient" ? (
                      <Link to="/doctors">
                        <a
                          href="#"
                          className={
                            " text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium " +
                            (props.active == "/doctors" ? "bg-gray-700" : "")
                          }
                        >
                          Mapa Lekarzy
                        </a>
                      </Link>
                    ) : (
                      ""
                    )}

                    <Link to="/prescriptions">
                      <a
                        href="#"
                        className={
                          " text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium " +
                          (props.active == "/prescriptions"
                            ? "bg-gray-700"
                            : "")
                        }
                      >
                        Recepty
                      </a>
                    </Link>
                    <Link to="/calendar">
                      <a
                        href="#"
                        className={
                          " text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium " +
                          (props.active == "/calendar" ? "bg-gray-700" : "")
                        }
                      >
                        Kalendarz
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="ml-3 relative">
                    <div>
                      <button
                        className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        id="user-menu"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={
                            photoURL ||
                            "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg"
                          }
                          alt=""
                        ></img>
                      </button>
                    </div>

                    <div
                      className="group origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 opacity-0 hover:opacity-100 absolute z-50"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link to="/settings">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Ustawienia profilu
                        </a>
                      </Link>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => {
                          auth.signOut();
                          navigate("/");
                        }}
                      >
                        Wyloguj
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </a>

              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Team
              </a>

              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Prescription
              </a>

              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Calendar
              </a>

              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Reports
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={
                      photoURL ||
                      "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg"
                    }
                    alt=""
                  ></img>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {displayName}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {email}
                  </div>
                </div>
              </div>
              <div className="group mt-3 px-2 space-y-1 opacity-0 group-hover:opacity-100 z-50 absolute">
                <Link to="/settings">
                  <a
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Settings
                  </a>
                </Link>
                <Link to="/">
                  <a
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    onClick={() => {
                      auth.signOut();
                    }}
                  >
                    Sign out
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>{props.children}</main>
      </div>
    </>
  );
};

export default ProfilePage;
