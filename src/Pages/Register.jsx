import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  async function registerOnSubmit(userData) {
    try {
      setLoading(true);
      const response = await axios.post("https://api.escuelajs.co/api/v1/users/", userData);
      console.log(response.data.message);
      setLoading(false);
      reset();
      navigate("/login");
      toast.success("Registration Successful");
    } catch (error) {
      console.log(error.message);
      toast.error("Registration Failed");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-green-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-10">
          <h2 className="text-3xl font-extrabold text-center text-green-800 mb-8">Register</h2>
          <form onSubmit={handleSubmit(registerOnSubmit)}>
            <div className="mb-5">
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
                placeholder="Enter your name"
                {...register("name")}
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
                placeholder="Enter your password"
                {...register("password")}
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="role">
                Role
              </label>
              <select
                {...register("role")}
                id="role"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="avatar">
                Avatar
              </label>
              <input
                {...register("avatar")}
                id="avatar"
                type="text"
                placeholder='Your avatar URL'
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-200"
            >
              {loading ? <span className="loading loading-spinner loading-md"></span> : "Register"}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <NavLink to="/login" className="text-green-600 hover:underline">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
