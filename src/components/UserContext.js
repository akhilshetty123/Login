import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
