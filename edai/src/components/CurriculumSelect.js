import React, { useState, useEffect } from 'react';

const CurriculumSelect = ({ selectedCountry, globalCountryId, onCurriculumChange }) => {
  const [curriculums, setCurriculums] = useState([]);

  useEffect(() => {
    const fetchCurriculumsData = async () => {
      try {
        const response = await fetch(`/country/${globalCountryId}/curriculums`);
        const data = await response.json();
        setCurriculums(data);
        console.log('curriculums data:', data);
      } catch (error) {
        console.error('Error fetching curriculum data:', error);
      }
    };

    if (globalCountryId && globalCountryId !== '') {
      console.log('fetch curriculum called');
      fetchCurriculumsData();
    }
  }, [globalCountryId]);

  const handleCurriculumChange = (event) => {
    const selectedCurriculumId = event.target.value;
    const selectedCurriculum = curriculums.find((curriculum) => curriculum.id === selectedCurriculumId);
    onCurriculumChange(selectedCurriculum);
  };

  return (
    <div>
      <select onChange={handleCurriculumChange}>
        <option value="">Select Curriculum</option>
        {curriculums.map((curriculum) => (
          <option key={curriculum.id} value={curriculum.id}>
            {curriculum.curriculum}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurriculumSelect;