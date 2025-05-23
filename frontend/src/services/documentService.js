// documentService.js (Corrected version)

import {
  uploadFile,
  fetchDocuments,
  fetchQuestionHistory,
  askQuestion 
} from './api';


export { fetchDocuments, fetchQuestionHistory };

export const uploadDocument = async (file) => {
  try {
    return await uploadFile(file);
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const submitQuestion = async (documentId, questionText) => {
  try {
    return await askQuestion(documentId, questionText); 
  } catch (error) {
    console.error('Error submitting question:', error);
    throw error;
  }
};