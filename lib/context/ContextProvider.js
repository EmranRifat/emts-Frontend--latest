import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [user, setUser] = useState({
    uuid: null,
    accessToken: null,
    refreshToken: null,
    phoneNumber: null,
    phoneNumberVerified: false,
    username: null,
  });

  // console.log("usersssss",user);
  useEffect(() => {
    // Initialize the user data from cookies
    const savedUser = {
      uuid: Cookies.get("uuid") || null,
      accessToken: Cookies.get("access") || null,
      refreshToken: Cookies.get("refresh") || null,
      userType: Cookies.get("userType") || null,
      userName: Cookies.get("userName") || null,
      phoneNumberVerified: Cookies.get("phoneNumberVerified") === "true",
    };

    setUser(savedUser);
  }, []);




  const updateUser = (
    uuid,
    accessToken,
    refreshToken,
    phoneNumber,
    phoneNumberVerified,
    username
  ) => {
    const newUser = {
      uuid,
      accessToken,
      refreshToken,
      phoneNumber,
      phoneNumberVerified,
      username,
    };
    setUser(newUser);

    // Store user data in cookies
    // Cookies.set("uuid", uuid);
    // Cookies.set("accessToken", accessToken);
    // Cookies.set("refreshToken", refreshToken);
    // Cookies.set("phoneNumber", phoneNumber);
    // Cookies.set("phoneNumberVerified", phoneNumberVerified ? "true" : "false");
    // Cookies.set("username", username);
  };





  const clearUser = () => {
    setUser({
      uuid: null,
      accessToken: null,
      refreshToken: null,
      phoneNumber: null,
      phoneNumberVerified: false,
      username: null,
    });

    // Clear user data from cookies
    Cookies.remove("uuid");
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.remove("phoneNumber");
    Cookies.remove("phoneNumberVerified");
    Cookies.remove("username");
  };

  const userInfo = {
    user,
    updateUser,
    clearUser,
  };

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
