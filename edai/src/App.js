import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import LoginSignupPage from './components/LoginSignUp';
import Dashboard from './components/Dashboard';
import { AppProvider } from './components/AppContext';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/LoginSignUp" element={<LoginSignupPage />} />
            <Route path="/Dashboard" element={
            <AppProvider>
              <Dashboard />
            </AppProvider>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;