import React, { useState, useEffect } from 'react';

function TopicDisplay({ subjectId, globalCountryId }) {
  const [topics, setTopics] = useState(null)
    const isSubjectSelected = true;

    useEffect(() => {
      const fetchTopicsData = async () => {
          try {
              // Make an API request to fetch the subject data for the selected subject
              const response = await fetch(`http://18.210.33.70/country/1/curriculum/1/subject/4/topics`);
              const data = await response.json();

              // Set the subject state with the fetched data
              setTopics(data.topics);
          } catch (error) {
              console.error('Error fetching topics data:', error);
          }
      };

      fetchTopicsData();

  }, [subjectId, globalCountryId]);

  let content;
    if (isSubjectSelected) {
      
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