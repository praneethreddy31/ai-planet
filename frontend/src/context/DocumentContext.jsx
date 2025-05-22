// src/context/DocumentContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments } from '../services/documentService';

export const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDocument, setCurrentDocument] = useState(null);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await fetchDocuments();
      setDocuments(data);
      setError(null);
    } catch (err) {
      setError('Failed to load documents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <DocumentContext.Provider
      value={{
        documents,
        setDocuments,
        loading,
        error,
        currentDocument,
        setCurrentDocument,
        refreshDocuments: loadDocuments,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
