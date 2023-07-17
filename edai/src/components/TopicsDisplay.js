import React, { useEffect, useState } from 'react';
import { selectedSubject } from './SubjectsDisplay';

function TopicsDisplay({ selectedSubject }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Fetch topics for the selected subject
    if (selectedSubject) {
      fetchTopics(selectedSubject);
    }
  }, [selectedSubject]);

  const fetchTopics = async (subjectId) => {
    try {
      // Make an API request to fetch the topics data for the selected subject
      const response = await fetch(`http://3.85.54.102/api/subject/${subjectId}/topics`);
      const data = await response.json();

      // Set the topics state with the fetched data
      setTopics(data.topics);
    } catch (error) {
      console.error('Error fetching topics data:', error);
    }
  };
  const handClick = () => {
    console.log( selectedSubject );
  }

  return (
    <div>
      <ul>
        <li onClick={ handClick }>Topics</li>
        {topics.map(topic => (
          <li key={topic.id}>{topic.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TopicsDisplay;
