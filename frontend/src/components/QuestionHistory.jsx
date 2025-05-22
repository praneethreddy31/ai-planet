// src/components/QuestionHistory.jsx
import React from 'react';

const QuestionHistory = ({ history }) => {
  if (history.length === 0) {
    return <p>No questions asked yet.</p>;
  }

  return (
    <div className="question-history">
      {history.map((item) => (
        <div key={item.id} className="history-item">
          <div className="history-question">
            <strong>Q:</strong> {item.question}
          </div>
          <div className="history-answer">
            <strong>A:</strong> {item.answer}
          </div>
          <div className="history-timestamp">
            {new Date(item.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionHistory;
