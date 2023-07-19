import React, { createContext, useState } from 'react';

const SubjectContext = createContext();

const SubjectProvider = ({ children }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  return (
    <SubjectContext.Provider value={{ selectedSubjectId, setSelectedSubjectId }}>
      {children}
    </SubjectContext.Provider>
  );
};

export { SubjectContext, SubjectProvider };
