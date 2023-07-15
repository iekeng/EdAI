class AuthService {
    // Login method
    login(email, password) {
      return fetch('http://3.85.54.102/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.access_token) {
            this.saveToken(data.access_token);
          }
          return data;
        });
    }
  
    // Save access token to session storage
    saveToken(token, storageType = 'local') {
      const storage = storageType === 'session' ? sessionStorage : localStorage;
      storage.setItem('token', token);
    }
  
    // Logout method
    logout() {
      localStorage.removeItem('access_token');
    }
  
    // Check if user is authenticated
    isAuthenticated() {
      const accessToken = sessionStorage.getItem('access_token');
      return accessToken !== null;
    }
  }
  
  const authService = new AuthService();
  
  export default authService;
  