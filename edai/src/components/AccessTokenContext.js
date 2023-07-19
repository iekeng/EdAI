import { createContext, useContext, useState } from 'react';

const AccessTokenContext = createContext();

export const useAccess_token = () => {
  return useContext(AccessTokenContext);
};

export const AccessTokenProvider = ({ children }) => {
  const [access_token, setAccess_token] = useState('');

  const updateAccess_token = (token) => {
    setAccess_token(token);
  };

  return (
    <AccessTokenContext.Provider value={{ access_token, updateAccess_token }}>
      {children}
    </AccessTokenContext.Provider>
  );
};
