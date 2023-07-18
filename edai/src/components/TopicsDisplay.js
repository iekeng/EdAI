import React, { useEffect, useState, useContext } from 'react';
import { SubjectContext } from './SubjectContext';
// import ContentDisplay from './ContentDisplay';
import { TopicContext } from './TopicContext';

function TopicsDisplay() {
  const [topics, setTopics] = useState([]);
  const { selectedSubjectId } = useContext(SubjectContext);
  const {selectedTopicId, setSelectedTopicId} = useContext(TopicContext);

  useEffect(() => {
    // Fetch topics for the selected subject
    if (selectedSubjectId) {
      console.log('Fetching topics for subject:', selectedSubjectId);
      fetchTopics(selectedSubjectId);
    }
  });

  const fetchTopics = async (subjectId) => {
    try {
      const response = await fetch(`http://3.85.54.102/api/subject/${subjectId}/topics`);
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
    console.log('Topic id:', topicId);
  };

  const handleMouseEnter = (event) => {
    // Change text color to white on hover
    event.target.style.color = 'black';
  };

  const handleMouseLeave = (event) => {
    // Change text color back to black on hover exit
    event.target.style.color = 'white';
  };

  return (
    <div className="topicslist">
    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))', listStyle: 'none', padding: 0, margin: 0 }}>
       {topics && topics.map(topic => (
          <li key={topic.id} style={{ cursor: 'pointer', fontSize: '15px' }}>
            <a
              onClick={() => handleTopicClick(topic.id)}
              style={{ color: 'white', transition: 'color 0.3s ease' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {topic.topic}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicsDisplay;
