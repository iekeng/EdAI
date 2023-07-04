import React, { useState, useEffect } from 'react';

const CurriculumSelect = ({ selectedCountry }) => {
  const [curriculum, setCurriculum] = useState('');
  
  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        // Make an API request to fetch the curriculum data for the selected country
        const response = await fetch(`/api/curriculums`);
        const data = await response.json();

        // Set the curriculum state with the fetched data
        setCurriculum(data.curriculum);
      } catch (error) {
        console.error('Error fetching curriculum data:', error);
      }
    };

    //Call the fetchCurriculumData function when the selectedCountry state changes
    if (selectedCountry) {
      fetchCurriculumData();
    }
  }, [selectedCountry]);

  return (
    <div>
      <button>Curriculum: {curriculum}</button>
    </div>
  );
};

export default CurriculumSelect;