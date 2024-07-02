import React, { useState, useEffect, useRef } from 'react';

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('wss://your-websocket-url');
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      try {
        ws.current.send(JSON.stringify({ message: input }));
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="/logo.png" alt="Chat Logo" className="chat-logo" />
        <h1 className="chat-title">ChatGPT Clone</h1>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chat-input"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Index;