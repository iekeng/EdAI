import React from 'react';
import TopicContent from './TopicContent';

function ContentDisplay() {
    const isTopicSelected = true;
  
    let content;
    if (isTopicSelected) {
      content = <TopicContent />;
     } else {
      content = "Select topic to study";
     }
    return (
      <div>
        {content}
      </div>
    );
  }

export default ContentDisplay;