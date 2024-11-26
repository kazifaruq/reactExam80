import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { userToken, loggedUser } = useContext(AuthContext);

  const userInfo = JSON.parse(localStorage.getItem("loggedUser"));
  const googleUserInfo = JSON.parse(localStorage.getItem("userFromGoogle"));
  //console.log(googleUserInfo);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("userFromGoogle");
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
              <li>
                {googleUserInfo ? (
                  <li onClick={logout} className="cursor-pointer">
                    logout
                  </li>
                ) : (
                  <NavLink to={"/login"}>Login</NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center w-full max-w-sm p-6">
          <div className="px-2">
            <NavLink
              to="/"
              className="bg-slate-200 text-lg font-semibold text-indigo-600 hover:text-pink-500 transition-all duration-500 px-2 py-1 rounded-lg border border-transparent hover:border-pink-500"
            >
              Home
            </NavLink>
          </div>


          <div className="px-2">
            <NavLink
              to="/profile"
              className="bg-slate-200 text-lg font-semibold text-indigo-600 hover:text-pink-500 transition-all duration-500 px-2 py-1 rounded-lg border border-transparent hover:border-pink-500"
            >
              Profile
            </NavLink>
          </div>
          <div className="px-2">
            {googleUserInfo ? (
              <button
                onClick={logout}
                className="bg-slate-200 text-lg font-semibold text-indigo-600 hover:text-pink-500 transition-all duration-500 px-2 py-1 rounded-lg border border-transparent hover:border-pink-500"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="bg-slate-200 text-lg font-semibold text-indigo-600 hover:text-pink-500 transition-all duration-500 px-2 py-1 rounded-lg border border-transparent hover:border-pink-500"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
        <div className="navbar-end">
          {userInfo ||
            (googleUserInfo && (
              <div className="dropdown dropdown-end z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        googleUserInfo
                          ? googleUserInfo?.photoURL
                          : "https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <NavLink to={"/profile"} className="justify-between">
                      {userInfo || googleUserInfo
                        ? userInfo?.name ||
                          googleUserInfo?.displayName ||
                          "Profile"
                        : "Profile"}

                      <span className="badge">New</span>
                    </NavLink>
                  </li>
                  <li
                    onClick={logout}
                    className="bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
