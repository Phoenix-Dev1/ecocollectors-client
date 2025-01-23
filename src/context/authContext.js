import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (inputs) => {
    try {
      const res = await axios.post('/auth/login', inputs);
      setCurrentUser(res.data);
      return res.data.role; // Return the user role
    } catch (error) {
      throw error; // Rethrow the error for handling in the component
    }
  };

  const logout = async () => {
    try {
      await axios.get('/auth/logout');
      setCurrentUser(null);
      localStorage.removeItem('user'); // Remove user data from local storage
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
