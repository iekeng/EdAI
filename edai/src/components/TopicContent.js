import React, { useState, useEffect } from 'react';

function TopicContent({ topicId }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    // Fetch the content from the API endpoint
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      console.error('Access token not found in localStorage.');
      return;
    }

    fetch(`http://3.85.54.102/api/topic/${topicId}/content`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setContent(data))
      .catch(error => console.error('Error fetching content:', error));
  }, [topicId]);

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
