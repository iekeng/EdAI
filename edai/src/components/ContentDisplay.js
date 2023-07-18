import React, { useEffect, useState, useContext } from 'react';
import { TopicContext } from './TopicContext';

function ContentDisplay(){
  const [content, setContent] = useState('')
  const { selectedTopicId } = useContext(TopicContext);

  useEffect (()=>{
    if(selectedTopicId){
      console.log('Received Topic Id', selectedTopicId);
      fetchContent(selectedTopicId);
    }
}, [selectedTopicId]);

const fetchContent = async (topicId) => {
  try {
    const response = await fetch(`http://3.85.54.102/api/topic/${topicId}/content`);
    const data = await response.json();
    setContent(data.content)

  } catch (error){
    console.error('Error fetching content: ', error)
  }
};

  return (
    <div>
      {content}
    </div>
  );
}

export default ContentDisplay;