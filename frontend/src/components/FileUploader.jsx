// src/components/FileUploader.jsx
import React, { useContext, useState } from 'react';
import { uploadDocument } from '../services/documentService';
import { DocumentContext } from '../context/DocumentContext';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const { refreshDocuments } = useContext(DocumentContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      setError('Please select a PDF file');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    setError(null);
    
    try {
      await uploadDocument(file);
      setFile(null);
      refreshDocuments();
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.detail || 'facing API issue ! please try later , meanwhile use uploaded DOCs ');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-uploader">
      <form onSubmit={handleUpload}>
        <div className="upload-container">
          <input
            type="file"
            id="pdf-upload"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <label htmlFor="pdf-upload" className="upload-label">
            {file ? file.name : 'Choose a PDF file'}
          </label>
          <button 
            type="submit" 
            disabled={!file || uploading}
            className="upload-button"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default FileUploader;
