import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

const Profile = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.id) {
          const response = await fetch(`http://18.210.33.70/profile/${user.id}`);
          if (!response.ok) {
            throw new Error('Error fetching user data');
          }
          const data = await response.json();
          setStudentData(data);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn, user]);

  return (
    <nav>
      {isLoading ? (
        <span>Loading...</span>
      ) : isLoggedIn && studentData ? (
        <>
          <span>Welcome, {studentData.firstname} {studentData.lastname}!</span>
          <img src={studentData.avatar} alt="Profile Avatar" />
          <progress value={studentData.progress} max="100" />
          <p>Email: {studentData.email}</p>
          <p>Curriculum: {studentData.curriculum}</p>
          <p>Country: {studentData.country}</p>
        </>
      ) : (
        <span>Please log in to view your profile.</span>
      )}
    </nav>
  );
};

export default Profile;
