import React from 'react'
import { useState, useEffect } from 'react';

const SubjectsDisplay = () => {
    const [subjects, setSubjects] = useState([]);
    
    useEffect(() => {
        const fetchSubjectsData = async () => {
            try {
                // Make an API request to fetch the subject data for the selected subject
                const response = await fetch(`/api/curriculum/<int:id>/subjects`);
                const data = await response.json();

                // Set the subject state with the fetched data
                setSubjects(data.subjects);
            } catch (error) {
                console.error('Error fetching subject data:', error);
            }
        };

        fetchSubjectsData();

    }, []);

    return (
    <div> 
          <h2>Subjects</h2>
          <ul id='subjects-li'>
            {subjects.map(subject => (
              <li key={subject.id}>{subject.name}</li>
            ))}
          </ul>
    </div>
  )
}

export default SubjectsDisplay;