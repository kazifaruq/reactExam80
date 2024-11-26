import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust the import path as necessary

const Profile = () => {
  const { loggedUser, googleUser } = useContext(AuthContext);

  // Determine which user info to display
  const userInfo = loggedUser || googleUser;

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border bg-blue-500">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-600">User Profile</h2>

        {userInfo ? (
          <div>
            <h3 className="text-2xl font-semibold text-blue-500">User Information</h3>
            <p className="text-blue-700">
              <strong>Name:</strong> {userInfo?.name || userInfo?.displayName}
            </p>
            <p className="text-blue-700">
              <strong>Email:</strong> {userInfo?.email}
            </p>
            {userInfo.role && (
              <p className="text-blue-700">
                <strong>Role:</strong> {userInfo?.role}
              </p>
            )}
            <img
              src={userInfo?.avatar || userInfo?.photoURL}
              alt="User Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-300"
            />
          </div>
        ) : (
          <p className="text-blue-600">Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;