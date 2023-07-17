import React, { useEffect, useState } from 'react';

function SubjectsDisplay() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(0);

  useEffect(() => {
    // Fetch user subjects when the component mounts
    fetchUserSubjects();
  }, []);

  const fetchUserSubjects = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        console.error('Access token not found in localStorage.');
        return;
      }

      const response = await fetch('http://3.85.54.102/api/user/subjects', {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        // Make sure the responseData is an array
        if (Array.isArray(responseData)) {
          // Make sure each element in the array has a 'subject' property
          const isValidData = responseData.every(item => item.hasOwnProperty('subject'));

          if (isValidData) {
            setSubjects(responseData);
          } else {
            console.error('Invalid data format returned from the API:', responseData);
          }
        } else {
          console.error('Invalid data format returned from the API:', responseData);
        }
      } else {
        console.error('Error fetching user subjects:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user subjects:', error);
    }
  };

  const handleSubjectClick = (subjectId) => {
    setSelectedSubject(subjectId);
    console.log('Subject clicked:', subjectId);
  };

  return (
    <div>
      <h2>Subjects</h2>
      <ul id='subjects-li'>
        {subjects.map(subject => (
          <li key={subject.id} value={subject.subject}>
             <a onClick={() => handleSubjectClick(subject.id)} style={{ color: 'black'}}>
              {subject.subject}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectsDisplay;
export const selectedSubject = SubjectsDisplay.selectedSubject;
