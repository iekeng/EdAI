import React, { useState } from 'react';

const SwipeableList = () => {
  const [lists] = useState([
    {
      id: 1,
      country: 'Algeria',
      curriculum: 'PNEF Curriculum',
      subjects: ['Mathematics', 'Physics', 'Literature', 'Information Technology',  'History', 'Biology', 'Chemistry', 'French'],
      region: 'North Africa'
    },
    {
      id: 2,
      country: 'Egypt',
      curriculum: 'Egypt National Curriculum',
      subjects: ['Arabic', 'English', 'Geography', 'Mathematics', 'Physics', 'Biology', 'Chemistry', 'French'],
      region: 'North Africa'
    },
    {
      id: 3,
      country: 'Nigeria',
      curriculum: 'WAEC Curriculum',
      subjects: ['Chemistry', 'English', 'Biology', 'Mathematics', 'Physics', 'Geography', 'French'],
      region: 'West Africa'
    },
    {
      id: 4,
      country: 'Ghana',
      curriculum: 'WASSCE Curriculum',
      subjects: ['Mathematics', 'English', 'History', 'Physics', 'Geography',],
      region: 'West Africa'
    },
    {
      id: 5,
      country: 'Kenya',
      curriculum: 'CBC Curriculum',
      subjects: ['Information Technology', 'Mathematics', 'Swahili', 'Science', 'History', 'Physics', 'Geography'],
      region: 'East Africa'
    },
    {
      id: 6,
      country: 'Tanzania',
      curriculum: 'CBC Curriculum',
      subjects: ['History', 'Physics', 'Geography', 'Mathematics', 'Swahili'],
      region: 'East Africa'
    },
    {
      id: 7,
      country: 'South Africa',
      curriculum: 'CAPS Curriculum',
      subjects: ['Physics', 'Information Technology', 'Geography', 'Mathematics', 'English', 'History'],
      region: 'Southern Africa'
    },
    {
      id: 8,
      country: 'Zimbabwe',
      curriculum: 'Zimbabwe National Curriculum',
      subjects: ['Mathematics', 'Physics', 'Geography', 'English', 'Biology'],
      region: 'Southern Africa'
    },
    {
      id: 9,
      country: 'Senegal',
      curriculum: 'CIS Curriculum',
      subjects: ['Mathematics', 'French', 'Physics', 'Geography', 'History'],
      region: 'West Africa'
    },
    {
      id: 10,
      country: 'Ivory Coast',
      curriculum: 'PEE Curriculum',
      subjects: ['Mathematics', 'French', 'Geography', 'Physics'],
      region: 'West Africa'
    }
    
  ]);
  const [selectedList, setSelectedList] = useState(lists[0]);

  const handlePrevList = () => {
    const currentIndex = lists.findIndex((list) => list === selectedList);
    const prevList = lists[currentIndex - 1] || lists[lists.length - 1];
    setSelectedList(prevList);
  };

  const handleNextList = () => {
    const currentIndex = lists.findIndex((list) => list === selectedList);
    const nextList = lists[currentIndex + 1] || lists[0];
    setSelectedList(nextList);
  };

  return (
    <div className="list-container">
      <div className="swipe-buttons">
        <button onClick={handlePrevList}>&lt;</button>
        <button onClick={handleNextList}>&gt;</button>
      </div>
      <div className="swipe-list-container">
        
          <ul className="swipe-list">
            <li>{selectedList.country}</li>
            <li>{selectedList.curriculum}</li>
            {selectedList.subjects.map((subject, index) => (
              <li key={index}>{subject}</li>
            ))}
          </ul>
        
      </div>
    </div>
  );
};

export default SwipeableList;
