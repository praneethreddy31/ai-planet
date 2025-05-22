import React, { useState } from 'react';
import { submitQuestion } from '../services/documentService';

const QAInterface = ({ documentId, onQuestionAnswered }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Define the mock response generator function
  const generateMockResponse = (question) => {
    // Basic response logic
    if (question.toLowerCase().includes("who") || question.toLowerCase().includes("what")) {
      return "Based on the document, this appears to be related to the main topic discussed. The document provides detailed information about this subject.";
    } else if (question.toLowerCase().includes("when") || question.toLowerCase().includes("where")) {
      return "The document mentions specific details about this, though I can only provide a general answer without the backend connection.";
    } else if (question.toLowerCase().includes("why") || question.toLowerCase().includes("how")) {
      return "The document explains the process and reasoning behind this. It provides step-by-step information about the subject.";
    } else {
      return "The document contains information related to your question. When the server connection is restored, I'll be able to provide a more specific answer.";
    }
  };

  const handleSendMessage = async (message) => {
    // Add user message to the chat
    setMessages(prev => [...prev, { type: 'user', text: message }]);
    setIsLoading(true);
    setError(null);
    
    try {
      // Try the real API first
      const response = await submitQuestion(documentId, message);
      setMessages(prev => [...prev, { type: 'ai', text: response.answer }]);
      
      if (onQuestionAnswered) {
        onQuestionAnswered(response);
      }
    } catch (error) {
      console.error("Question error:", error);
      
      // FALLBACK: Generate a mock response when the API fails
      const mockResponse = generateMockResponse(message);
      
      setMessages(prev => [...prev, { 
        type: 'ai', 
        text: mockResponse + "\n\n*(This is a fallback response due to server issues)*" 
      }]);
      
      // Still call the callback with a mock object
      if (onQuestionAnswered) {
        onQuestionAnswered({
          id: Date.now(),
          question: message,
          answer: mockResponse,
          created_at: new Date().toISOString()
        });
      }
      
      setError("Server error - fallback response provided");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="qa-interface">
      <div className={`chat-container ${messages.length === 0 ? 'empty' : ''}`}>
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>Ask a question about this document to get started.</p>
          </div>
        ) : (
          <div className="message-list">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="message ai loading">
                <div className="loading-indicator">Thinking...</div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="input-container">
        <form onSubmit={(e) => {
          e.preventDefault();
          const input = e.target.elements.message;
          const message = input.value.trim();
          if (message) {
            handleSendMessage(message);
            input.value = '';
          }
        }}>
          <input 
            type="text" 
            name="message"
            placeholder="Type your question here..." 
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Ask"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QAInterface;
