import React, { useState, useEffect } from 'react';

function TopicDisplay({ subjectId, globalCountryId }) {
  const [topics, setTopics] = useState(null)
    const isSubjectSelected = true;

    useEffect(() => {
      const fetchTopicsData = async () => {
          try {
              // Make an API request to fetch the subject data for the selected subject
              const response = await fetch(`/api/curriculum/${globalCountryId}/subject/${subjectId}/topics`);
              const data = await response.json();

              // Set the subject state with the fetched data
              setTopics(data.topics);
          } catch (error) {
              console.error('Error fetching topics data:', error);
          }
      };

      fetchTopicsData();

  }, [subjectId]);

  let content;
    if (isSubjectSelected) {
      // setTopics(data)
      
      content = (
        <ul style={{listStyle: "none"}}>
          {topics && topics.map(topic => (
            <li key={topic.id}>{topic.title}</li>
          ))}
        </ul>
      );
    }


    return (
      <button>
        {content}
      </button>
    );
  }

export default TopicDisplay;