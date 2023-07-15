import { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [globalCountryId, setGlobalCountryId] = useState('');

  return (
    <AppContext.Provider value={{ globalCountryId, setGlobalCountryId }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
