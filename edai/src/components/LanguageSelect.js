import React, { useState } from 'react';

function LanguageSelect() {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <select value={selectedLanguage} onChange={handleLanguageChange}>
      <option value="">Select Language</option>
      <option value="EN">English</option>
      <option value="FR">French</option>
      <option value="SWA">Swahili</option>
    </select>
  );
}

export default LanguageSelect;