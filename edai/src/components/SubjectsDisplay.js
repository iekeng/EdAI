import React, { useEffect, useState, useContext } from 'react';
import TopicsDisplay from './TopicsDisplay';
import { SubjectContext } from './SubjectContext';

function SubjectsDisplay() {
  const [subjects, setSubjects] = useState([]);
  const { selectedSubjectId, setSelectedSubjectId } = useContext(SubjectContext);

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
    setSelectedSubjectId(subjectId); // Update the selectedSubjectId when subject is clicked
    console.log('Selected Subject ID:', subjectId);
  };

  const handleMouseEnter = (event) => {
    // Change text color to white on hover
    const anchor = event.target;
    anchor.style.color = 'white';
    anchor.style.backgroundColor = 'lightblue';
  };

  const handleMouseLeave = (event) => {
    // Change text color back to black on hover exit
    const anchor = event.target;
    anchor.style.color = 'black';
    anchor.style.backgroundColor = 'transparent';
  };

  return (
    <div>
    <h2>Subjects</h2>
    <ul id='subjects-li' style={{ listStyle: 'none' }}>
      {subjects.map(subject => (
        <li key={subject.id} value={subject.subject} style={{ cursor: 'pointer',  backgroundColor: selectedSubjectId === subject.id ? 'lightblue' : 'transparent' }}>
          <a
            onClick={() => handleSubjectClick(subject.id)}
            style={{ color: 'black', transition: 'color 0.3s ease' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {subject.subject}
          </a>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default SubjectsDisplay;
