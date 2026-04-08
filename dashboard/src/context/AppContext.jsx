import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const backendUrl = 'http://localhost:5000'; // Hardcode or env

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAuthState = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/auth/is-auth`);

      if (res.data?.success) {
        setIsLoggedin(true);
        setUserData(res.data.user);
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (err) {
      setIsLoggedin(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${backendUrl}/api/auth/logout`);
    } catch (e) {}
    setIsLoggedin(false);
    setUserData(null);
    window.location.href = "http://localhost:5173/login";
  };

  useEffect(() => {
    getAuthState();
  }, []);

  // No loading redirect - allow access, check auth in components


  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedin,
        userData,
        logout,
        loading,
        setIsLoggedin,
        setUserData,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};

