import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DocumentContext } from '../context/DocumentContext';
import QAInterface from '../components/QAInterface';
import QuestionHistory from '../components/QuestionHistory';
import { fetchQuestionHistory } from '../services/documentService';

const DocumentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { documents, setCurrentDocument } = useContext(DocumentContext);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [loading, setLoading] = useState(false); // Set to false initially
  
  // Ensure documents is an array
  const documentArray = Array.isArray(documents) ? documents : 
                      (documents && documents.documents) ? documents.documents : [];
  
  useEffect(() => {
    const documentId = parseInt(id);
    const document = documentArray.find(doc => doc.id === documentId);
    
    if (!document) {
      navigate('/');
      return;
    }
    
    setCurrentDocument(document);
    
    // TEMPORARY FIX: Skip API call and use empty array
    setQuestionHistory([]);
    setLoading(false);
    
    /* Comment out the API call until backend is ready
    const loadHistory = async () => {
      try {
        const history = await fetchQuestionHistory(documentId);
        setQuestionHistory(history);
      } catch (error) {
        console.error('Error loading question history:', error);
        setQuestionHistory([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadHistory();
    */
    
    return () => setCurrentDocument(null);
  }, [id, documentArray, navigate, setCurrentDocument]);
  
  const addQuestionToHistory = (newQuestion) => {
    setQuestionHistory(prev => [newQuestion, ...prev]);
  };
  
  // Fixed document title display
  const currentDocument = documentArray.find(doc => doc.id === parseInt(id));
  const documentTitle = currentDocument?.title || "Document Details";
  
  return (
    <div className="document-page">
      <div className="document-header">
        <button onClick={() => navigate('/')} className="back-button">
          &larr; Back to Documents
        </button>
        <h1>{documentTitle}</h1>
      </div>
      
      <div className="qa-container">
        <QAInterface documentId={parseInt(id)} onQuestionAnswered={addQuestionToHistory} />
        
        <div className="history-container">
          <h2>Question History</h2>
          {loading ? (
            <p>Loading history...</p>
          ) : questionHistory.length > 0 ? (
            <QuestionHistory history={questionHistory} />
          ) : (
            <p>No questions asked yet. Try asking a question about this document.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
