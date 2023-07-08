import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

const Profile = () => {
    const { user, isLoggedIn } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // Perform the API request to fetch user data based on the given ID
      const fetchUserData = async () => {
        try {
          if (user && user.id) {
            const response = await fetch(`http://18.210.33.70/profile/${user.id}`);
            const data = await response.json();
            // Update the user context with the fetched user data
            //setUser(data);
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
        ) : isLoggedIn ? (
          <>
            <span>Welcome, {user?.firstname} {user?.lastname}!</span>
            <img src={user.avatar} alt="Profile Avatar" />
            <progress value={user?.progress} max="100" />
          </>
        ) : (
          <span>Please log in to view your profile.</span>
        )}
      </nav>
    );
  };

    export default Profile;