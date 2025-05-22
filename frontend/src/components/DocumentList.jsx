// src/components/DocumentList.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DocumentContext } from '../context/DocumentContext';

const DocumentList = () => {
  const { documents } = useContext(DocumentContext);
  
  // Ensure documents is an array with defensive programming
  const documentArray = Array.isArray(documents) ? documents : 
                        (documents && documents.documents && Array.isArray(documents.documents)) ? 
                        documents.documents : [];

  if (documentArray.length === 0) {
    return (
      <div className="document-list empty">
        <p>No documents uploaded yet. Upload a PDF to get started.</p>
      </div>
    );
  }

  return (
    <div className="document-list">
      <h2>Your Documents</h2>
      <div className="document-grid">
        {documentArray.map((doc) => (
          <Link to={`/document/${doc.id}`} key={doc.id} className="document-card">
            <div className="document-icon">
              <i className="far fa-file-pdf"></i>
            </div>
            <div className="document-info">
              {/* Using property names that match backend */}
              <h3>{doc.title || "Unnamed Document"}</h3>
              <p>Uploaded: {new Date(doc.created_at).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
