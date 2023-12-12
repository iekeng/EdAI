import React, { useState, useEffect } from 'react';

function CurriculumSelect() {
  const [userCurriculum, setUserCurriculum] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserCurriculum();
  }, []);

  const fetchUserCurriculum = async () => {
    try {
      const access_token = localStorage.getItem('access_token');

      if (access_token) {
        const response = await fetch('/user/curriculum', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const curriculumName = data.curriculum;
          setUserCurriculum(curriculumName);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error fetching user curriculum:', error);
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '0px' }}>
      {loading ? (
        <h2 style={{ fontSize: '13px' }}>Loading...</h2>
      ) : userCurriculum ? (
        <h2 style={{ fontSize: '14px' }}>Curriculum: {userCurriculum}</h2>
      ) : (
        <h2 style={{ fontSize: '14px' }}>No curriculum selected.</h2>
      )}
    </div>
  );
}

export default CurriculumSelect;
