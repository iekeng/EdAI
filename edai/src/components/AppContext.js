import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [globalCountryId, setGlobalCountryId] = useState('');

  return (
    <AppContext.Provider value={{ globalCountryId, setGlobalCountryId }}>
      {children}
    </AppContext.Provider>
  );
};
