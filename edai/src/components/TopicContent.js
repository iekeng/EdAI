import React, { useEffect, useState, useContext } from 'react';
import { TopicContext } from './TopicContext';
import ContentDisplay from './ContentDisplay';

function TopicContent() {
  const [content, setContent] = useState(null);
  const { selectedTopicId } = useContext(TopicContext);

  useEffect(() => {
    if (!selectedTopicId) return;

    // Fetch the content from the API endpoint
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      console.error('Access token not found in localStorage.');
      return;
    }

    fetch(`http://3.85.54.102/api/topic/${selectedTopicId}/content`, {
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
      .then(data => {
        // Assuming the response data contains a 'content' field with the content text
        setContent(data.content);
      })
      .catch(error => console.error('Error fetching content:', error));
  }, [selectedTopicId]);

  if (!content) {
    return <p>Loading...</p>; // Placeholder while the content is being fetched
  }

  return (
    <div>
      {/* Render the fetched content */}
      <p>{content}</p>
      {selectedTopicId && <ContentDisplay topicId={selectedTopicId} />}
    </div>
  );
}

export default TopicContent;
