import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './components/AppContext'; 
import { SubjectProvider } from './components/SubjectContext'; 
import { TopicProvider } from './components/TopicContext';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AppProvider>
  <SubjectProvider>
  <TopicProvider>
      <App />
    </TopicProvider>
    </SubjectProvider>
  </AppProvider>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
