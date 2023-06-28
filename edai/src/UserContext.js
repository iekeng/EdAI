import React from 'react';

// Create a new UserContext
export const UserContext = React.createContext();

// UserContext Provider component
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Function to log in the user
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  // Create the context value object
  const contextValue = {
    user,
    isLoggedIn,
    login,
    logout,
  };

  // Return the UserContext.Provider with the context value and children components
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};