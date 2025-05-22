// src/components/MessageInput.jsx
import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a message..."
        disabled={disabled}
        className="message-input"
      />
      <button 
        type="submit" 
        disabled={!message.trim() || disabled}
        className="send-button"
      >
        <i className="fas fa-paper-plane"></i>
      </button>
    </form>
  );
};

export default MessageInput;
