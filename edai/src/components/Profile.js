import React, { useState, useEffect } from 'react';

function ProfileDisplay() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        const response = await fetch('http://3.85.54.102/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const { firstname, lastname } = data;
          setUserProfile({ firstname, lastname });
          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  return (
    <div style={{paddingBottom: '0px'}}>
      {loading ? (
        <h2 style={{ fontSize: '13px' }}>Loading...</h2>
      ) : userProfile ? (
        <div>
          <h2 style={{ fontSize: '14px' }}> {userProfile.firstname} {userProfile.lastname}</h2>
        </div>
      ) : (
        <h2 style={{ fontSize: '14px' }}>No profile data available.</h2>
      )}
    </div>
  );
}

export default ProfileDisplay;
