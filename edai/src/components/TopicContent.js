import React, { useState, useEffect } from 'react';

function TopicContent() {
    const [content, setContent] = useState(null);
  
  useEffect(() => {
  // Fetch the content from the API endpoint
  fetch('api/edai/curriculum/school/subjects/topics/content')
    .then(response => response.json())
    .then(data => setContent(data))
    .catch(error => console.error(error));
  }, []);
  
  if (!content) {
  return <p>Loading...</p>; // Placeholder while the content is being fetched
  }
  
  return (
  <div>
    {/* Render the fetched content */}
    <h2>{content.title}</h2>
    <p>{content.description}</p>
    {/* Additional content rendering */}
  </div>
  );
  }

export default TopicContent;