import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext= createContext();


export function AuthProvider({children}){
    const [userToken, setUserToken] = useState(null);
    const [loggedUser,setLoggedUser]=useState(null);
    const [googleUser,setGoogleUser]=useState(null);
    console.log(googleUser)
  
    
    async function getUserInfo(){
 try {
       const response= await axios.get("https://api.escuelajs.co/api/v1/auth/profile",{
      headers:{
        Authorization: `Bearer ${userToken?.access_token}`
      }
    })
    setLoggedUser(response.data);
    localStorage.setItem("userToken",JSON.stringify(userToken));
    localStorage.setItem("loggedUser",JSON.stringify(response.data));
 } catch (error) {
    console.log(error);
 }
  }


  useEffect(()=>{
    getUserInfo();
 
  },[userToken]);


  return (
    <AuthContext.Provider value={{userToken,setUserToken,loggedUser,setLoggedUser, googleUser,setGoogleUser}}>
      {children}
    </AuthContext.Provider>
  )
}