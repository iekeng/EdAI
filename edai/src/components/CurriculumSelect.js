import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';

const CurriculumSelect = () => {
  const [curriculums, setCurriculums] = useState([]);
  const { globalCountryId } = useContext(AppContext);

  useEffect(() => {
    const fetchCurriculumsData = async () => {
      try {
        const response = await fetch(`http://3.85.54.102/api/country/${globalCountryId}/curriculums`);
        const data = await response.json();
        setCurriculums(data);
        console.log('curriculums data:', data);
      } catch (error) {
        console.error('Error fetching curriculum data:', error);
      }
    };

    if (globalCountryId && globalCountryId !== '') {
      fetchCurriculumsData();
    }
  }, [globalCountryId]);

  const handleCurriculumChange = (event) => {
    // const selectedCurriculumId = event.target.value;
    // const selectedCurriculum = curriculums.find((curriculum) => curriculum.id === selectedCurriculumId);
    // onCurriculumChange(selectedCurriculum);
    console.log('globalCountryId: ', globalCountryId);
  };

  return (
    <div>
      <select onClick={handleCurriculumChange}>
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
