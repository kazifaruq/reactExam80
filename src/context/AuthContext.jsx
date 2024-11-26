import axios from "axios"; // Importing Axios for making HTTP requests
import { createContext, useEffect, useState } from "react"; // Importing necessary hooks and functions from React

export const AuthContext = createContext(); // Creating a context for authentication

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null); // State to hold the user's token
  const [loggedUser, setLoggedUser] = useState(null); // State to hold the logged-in user's information
  const [googleUser, setGoogleUser] = useState(null); // State to hold Google user information

  async function getUserInfo() {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${userToken?.access_token}`,
            // Passing the token in the Authorization header
          },
        }
      );
      setLoggedUser(response.data); // Setting the logged user data
      localStorage.setItem("userToken", JSON.stringify(userToken)); // Storing the token in local storage
      localStorage.setItem("loggedUser", JSON.stringify(response.data)); // Storing user data in local storage
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserInfo(); // Fetch user information when the component mounts or when userToken changes
  }, [userToken]); // Dependency array: effect runs when userToken changes

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setUserToken,
        loggedUser,
        setLoggedUser,
        googleUser,
        setGoogleUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  ); // Rendering child components that can access the context
}
