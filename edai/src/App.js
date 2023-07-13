import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import LogInForm from './components/LogIn';
import SignUpForm from './components/SignUp';
import Dashboard from './components/Dashboard';
import { AppProvider } from './components/AppContext';


function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/LogIn" element={<LogInForm />} />
            <Route path="/SignUp" element={<SignUpForm />} />
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