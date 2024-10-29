import { createContext, useContext, useState } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Initially not loading
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Function to fetch user data
  const fetchUser = async (token) => {
    try {
      setLoading(true); // Set loading to true when fetching
      const response = await axios.get("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    setLoading(false); // Set loading to false after fetching
  };

  // Login function that triggers GitHub OAuth
  const login = async () => {
    window.location.href = "/api/login";
  };

  // Function to handle successful login (with token)
  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    fetchUser(token);
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, handleLogin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object,
}

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

