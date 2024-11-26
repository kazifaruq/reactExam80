import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const provider = new GoogleAuthProvider();

export default function Login() {
  const { setLoggedUser, setGoogleUser } = useContext(AuthContext);
  const naviGate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // login to google with firebase
  function loginGoogle() {
    localStorage.clear(); // clear if existing token is there
    signInWithPopup(auth, provider) //use popup window to sign in
      .then((result) => {
        const user = result.user;
        setGoogleUser(user); // user info save to state
        localStorage.setItem("userFromGoogle", JSON.stringify(user));
        naviGate("/profile");
        toast.success("Login with Google successful");
      })
      .catch((error) => {
        toast.error("Google login failed");
      });
  }
  // creating async function to submit authentication
  async function onSubmit(data) {
    localStorage.clear();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        data
      );
      const userInfo = response.data;
      setLoggedUser(userInfo); // save api authentication to state
      setLoading(false);
      reset(); // reset form
      naviGate("/profile");
      toast.success("Login with API successful");
    } catch (error) {
      toast.error("Login failed");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-10">
          <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                className="block text-gray-800 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-800 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="Enter your password"
                {...register("password")}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <button
            onClick={loginGoogle}
            className="w-full mt-5 flex gap-3 items-center justify-center bg-slate-900 text-white hover:bg-slate-800 py-3 rounded-md shadow-lg transition duration-200"
          >
            <FcGoogle />
            <span>Sign in with Google</span>
          </button>
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <NavLink to="/register" className="text-blue-600 hover:underline">
                Sign Up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
