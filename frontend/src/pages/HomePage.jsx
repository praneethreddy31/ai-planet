// src/pages/HomePage.jsx
import React, { useContext } from 'react';
import FileUploader from '../components/FileUploader';
import DocumentList from '../components/DocumentList';
import { DocumentContext } from '../context/DocumentContext';

const HomePage = () => {
  const { loading, error } = useContext(DocumentContext);

  return (
    <div className="home-page">
      <h1>PDF Question & Answer</h1>
      <p>Upload a PDF document or Use Demo documents below</p>
      
      <FileUploader />
      
      {loading && <p>Loading documents...</p>}
      {error && <p className="error">{error}</p>}
      
      <DocumentList />
    </div>
  );
};

export default HomePage;
