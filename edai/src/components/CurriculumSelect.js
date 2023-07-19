import React, { useState, useEffect } from 'react';

const CurriculumSelect = ({ selectedCountry, globalCountryId }) => {
  const [curriculum, setCurriculum] = useState('');
  
  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        // Make an API request to fetch the curriculum data for the selected country
        const response = await fetch(`http://18.210.33.70/country/${globalCountryId}/curriculums`);
        const data = await response.json();

        // Set the curriculum state with the fetched data
        setCurriculum(data.curriculum);
      } catch (error) {
        console.error('Error fetching curriculum data:', error);
      }
    };

    //Call the fetchCurriculumData function when the selectedCountry state changes
    if (globalCountryId && globalCountryId !== "") {
      console.log('fetch curriculum called')
      fetchCurriculumData();
    }
  }, [globalCountryId]);

  return (
    <div>
      <button>Curriculum: {curriculum}</button>
    </div>
  );
};

export default CurriculumSelect;