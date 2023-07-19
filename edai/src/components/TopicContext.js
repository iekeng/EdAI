import React, { createContext, useState } from 'react';

const TopicContext = createContext();

const TopicProvider = ({ children }) => {
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  return (
    <TopicContext.Provider value={{ selectedTopicId, setSelectedTopicId }}>
      {children}
    </TopicContext.Provider>
  );
};

export { TopicContext, TopicProvider };
