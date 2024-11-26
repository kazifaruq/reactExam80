import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
<div className="flex items-center justify-center h-screen bg-yellow-50">
  <div className="text-center">
    <h1 className="text-8xl font-extrabold text-red-700 mb-4">404</h1>
    <p className="text-2xl text-gray-800 mb-8">Oops! Page Not Found</p>
    <NavLink to="/" className="px-8 py-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
      Return Home
    </NavLink>
  </div>
</div>
    </>
  )
}
