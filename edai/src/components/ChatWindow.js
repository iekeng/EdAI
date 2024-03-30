import React, { useState, useEffect, useRef } from 'react';
import '../Chat.css';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const messagesRef = useRef(0);

  const handleChatDisplay = () => {
    setIsToggle(!isToggle);
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Fetch messages when the component mounts
    fetchMessagesAndUpdateState();
  }, []);

  const fetchMessagesAndUpdateState = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      console.log('Access Token:', access_token); // Log the access token to the console

      // Make the API request with the access token in the headers
      const response = await fetch('/api/chats', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const responseData = await response.json();
      setMessages(responseData.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      setIsLoading(true);
      const prompt = newMessage;
      setMessages([...messages, prompt])

      if (prompt) {
        setNewMessage('');

        // Send the message to the chatbot
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({ prompt }),
        });
        const responseData = await response.json();

        // Update the state with the new message
        if (responseData.message) {
          setMessages([...messages, prompt, responseData.message]);
        }

        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <a className={`placeholder ${isToggle ? 'show' : 'hide'}`} onClick={handleChatDisplay}>
        <div className="card-header header-title">
          <p className='card-header-title'>AI SUPPORT</p>
        </div>
      </a>

      <div className={`chatBox ${isToggle ? 'hide' : 'show'}`} >

        <div>
          <a onClick={handleChatDisplay}>
            <div className="card-header header-title">
              <p className='card-header-title' >AI SUPPORT</p>
            </div>
          </a>
          <div>
            {isLoading ?
              <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
              :
              <div className='sponsor'>
                <div style={{ textAlign: 'center' }} className='message'>Powered by ChatGPT</div>
              </div>}
            <div className='card-content chat-content'>
              <div className='content'>
                <div className="chat-message-group" ref={messagesRef} style={{ height: '300px', overflowY: 'auto' }}>
                  <div className="chat-messages">
                    {messages?.map((message, index) => (
                      <div key={index} className="message">{message}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <footer className="message-input">
              <input style={{ width: '70%', color: 'white' }} className="chat-textarea" type="text" placeholder="Type here"
                value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
              <button style={{ width: '30%' }} onClick={sendMessage}>Send</button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
