import axios from 'axios';
import { uploadFile, fetchDocuments, fetchQuestionHistory } from './api';

// Define your API URL constant
const API_URL = process.env.REACT_APP_API_URL || 'https://fastapi-ai-service-272733104980.asia-south1.run.app';

export { fetchDocuments, fetchQuestionHistory };

export const uploadDocument = async (file) => {
  try {
    return await uploadFile(file);
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const submitQuestion = async (documentId, question) => {
  try {
    const response = await axios.post(`${API_URL}/questions/ask/`, {
      document_id: documentId,
      question_text: question
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting question:', error);
    throw error;
  }
};
