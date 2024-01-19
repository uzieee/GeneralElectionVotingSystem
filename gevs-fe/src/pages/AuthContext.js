// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // You might have more user details here
  const [token, setToken] = useState(null); // Assuming you have a token for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData) => {
    // Logic to set user details and token upon successful login
    setUser(userData);
    setToken(userData.token); 
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Logic to clear user details and token upon logout
    setUser(null);
    setIsLoggedIn(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
