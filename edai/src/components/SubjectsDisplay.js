import React from 'react'
import { useState, useEffect } from 'react';

const SubjectsDisplay = ({ globalCountryId, setSubjectId }) => {
    const [subjects, setSubjects] = useState([]);
    
    useEffect(() => {
        const fetchSubjectsData = async () => {
            try {
                // Make an API request to fetch the subject data for the selected subject
                const response = await fetch(`http://3.85.54.102/api/country/${globalCountryId}/curriculum/<int:num>/subject`);
                const data = await response.json();

                // Set the subject state with the fetched data
                setSubjects(data.subjects);
            } catch (error) {
                console.error('Error fetching subject data:', error);
            }
        };

        fetchSubjectsData();

    }, [globalCountryId]);

    return (
    <div> 
          <h2>Subjects</h2>
          <ul id='subjects-li'>
            {subjects.map(subject => (
              <li onClick={()=>setSubjectId(subject.id)} key={subject.id}>{subject.name}</li>
            ))}
          </ul>
    </div>
  )
}

export default SubjectsDisplay;