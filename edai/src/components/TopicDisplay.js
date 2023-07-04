import React from 'react';

function TopicDisplay() {
    const isSubjectSelected = true;
  
    let content;
    if (isSubjectSelected) {
      const topics = [
        {id: 1, title: "Topic 1"}
      ];
      content = (
        <ul>
          {topics.map(topic => (
            <li key={topic.id}>{topic.title}</li>
          ))}
        </ul>
      );
    }
    return (
      <div>
        {content}
      </div>
    );
  }

export default TopicDisplay;