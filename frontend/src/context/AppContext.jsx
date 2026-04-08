
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // ⭐ MOST IMPORTANT

  // ✅ Auth check
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
      setLoading(false); // ⭐ auth check complete
    }
  };

const logout = async () => {
    try {
      await axios.get(`${backendUrl}/api/auth/logout`);
    } catch (e) {}
    localStorage.removeItem('token');
    setIsLoggedin(false);
    setUserData(null);
  };

  // Token sync from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !loading) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [loading]);

  // Axios interceptor for auth token
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    getAuthState();
  }, []);

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
