// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://fastapi-ai-service-272733104980.asia-south1.run.app/api';

console.log('Connecting to API at:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDocuments = async () => {
  const response = await api.get('/documents/');
  return response.data;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post(`/documents/upload/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const askQuestion = async (documentId, question) => {
  const response = await api.post('/questions/ask/', {
    document_id: documentId,
    question_text: question,
  });
  return response.data;
};

export const fetchQuestionHistory = async (documentId) => {
  const response = await api.get(`/questions/${documentId}/history/`);
  return response.data;
};

export default api;