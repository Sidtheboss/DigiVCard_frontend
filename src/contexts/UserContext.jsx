import React, { createContext, useState, useContext } from 'react';

// Create the context
const AppContext = createContext();

// Create a provider component
export const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context easily
export const useUserContext = () => useContext(AppContext);
