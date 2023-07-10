import React, { useState } from 'react';
import sendSvg from '../send-svg.png';
import audioSvg from '../audio-svg.png';

function ChatWindow() {
    const [isTyping, setIsTyping] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleTyping = () => {
      setIsTyping(true);
    };
  
    const handleBlur = () => {
      setIsTyping(false);
    };
  
    const handleSubmit = async () => {
      if (!userInput.trim()) {
        return; // Don't submit if user input is empty or only whitespace
      }
  
      try {
        setIsLoading(true);
  
        // Make the API request
        const response = await fetch('http://18.210.33.70/chatbot/', {
          method: 'POST',
          body: JSON.stringify({ request: userInput }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Check if the request was successful
        if (response.ok) {
          const data = await response.json();
          const apiFeedback = data.feedback;
  
          setFeedback(apiFeedback);
          setUserInput(''); // Clear the input field
        } else {
          console.error('API request failed:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const getWindowStyle = () => {
      if (isLoading) {
        return {
          height: 'auto',
          maxHeight: '100px'
        }
      }
      if (isTyping) {
        return {
          width: '40%',
          height: '200px',
        };
      } else {
        return {
          width: '20%px',
          height: '50px',
        };
      }
    };

    const chatbotContent = () => {
      if (isLoading) {
        return {
          display: '',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 10px',
          overflowY: 'auto',
          zIndex: '40',
        }
      }
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        padding: '0 10px',
        overflowY: 'auto',
        zIndex: '40',
      }
    }
  
    return (
      <div className="chatbot-window" style={getWindowStyle()}>
        <div style={chatbotContent()} className="chatbot-content-old">
          <input
            type="text"
            className="chatbot-input"
            placeholder="Type here or press and hold the mic button to speak to me ;-)"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onFocus={handleTyping}
            onBlur={handleBlur}
            disabled={isLoading}
          />
          <button className="chatbot-options" id="typing-option" onClick={handleSubmit} disabled={isLoading}>
            <img className='button-img' src={sendSvg} alt='Send Icon'/>
          </button>
          <button className="chatbot-options" id="audio-option" disabled={isLoading}>
            <img className='button-img' src={audioSvg} alt='Audio Icon'/>
          </button>
          <br/>
          {isLoading ? (
            <p style={{display: 'block'}} className="chatbot-feedback">Loading...</p>
          ) : (
            <p className="chatbot-feedback">{feedback}</p>
          )}
        </div>
      </div>
    );
  }

export default ChatWindow;