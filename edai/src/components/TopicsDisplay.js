import React, { useEffect, useState } from 'react';
import ContentDisplay from './ContentDisplay';

function TopicsDisplay({ selectedSubjectId }) {
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(0);

  useEffect(() => {
    // Fetch topics for the selected subject
    if (selectedSubjectId) {
      console.log('Fetching topics for subject:', selectedSubjectId);
      fetchTopics(selectedSubjectId);
    }
  }, [selectedSubjectId]);

  const fetchTopics = async (subjectId) => {
    try {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        console.error('Access token not found in localStorage.');
        return;
      }

      const response = await fetch(`http://3.85.54.102/subject/${subjectId}/topics`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTopics(data);
      } else {
        console.error('Error fetching topics data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching topics data:', error);
    }
  };

  const handleTopicClick = (topicId) => {
    setSelectedTopicId(topicId);
    console.log('Topic clicked:', topicId);
  };

  const handleMouseEnter = (event) => {
    // Change text color to white on hover
    const anchor = event.target;
    anchor.style.color = 'white';
  };

  const handleMouseLeave = (event) => {
    // Change text color back to black on hover exit
    const anchor = event.target;
    anchor.style.color = 'black';
  };

  return (
    <div>
      <ul>
        {topics && topics.map(topic => (
          <li key={topic.id} onClick={() => handleTopicClick(topic.id)} style={{ cursor: 'pointer' }}>
            <a
            onClick={() => handleTopicClick(topic.id)}
            style={{ color: 'black', transition: 'color 0.3s ease' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          ></a>
            {topic.topic}
          </li>
        ))}
      </ul>
      {selectedTopicId && <ContentDisplay selectedTopicId={selectedTopicId} />}
    </div>
  );
}

export default TopicsDisplay;
