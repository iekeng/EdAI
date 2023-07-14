import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';

const CurriculumSelect = ({ onCurriculumChange }) => {
  const [curriculums, setCurriculums] = useState([]);
  const { globalCountryId } = useContext(AppContext);

  useEffect(() => {
    const fetchCurriculumsData = async () => {
      try {
        const response = await fetch('http://3.85.54.102/api/curriculums');
        const data = await response.json();
        const filteredCurriculums = data.filter(curriculum => curriculum.country === globalCountryId);
        setCurriculums(filteredCurriculums);
        console.log('curriculums data:', filteredCurriculums);
      } catch (error) {
        console.error('Error fetching curriculum data:', error);
      }
    };

    if (globalCountryId && globalCountryId !== '') {
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
