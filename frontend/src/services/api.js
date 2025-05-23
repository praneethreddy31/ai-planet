// src/services/api.js
import axios from 'axios';

const API_URL = 'process.env.REACT_APP_API_URL';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(`${API_URL}/documents/upload/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const fetchDocuments = async () => {
  const response = await api.get('/documents/');
  return response.data;
};

export const askQuestion = async (documentId, question) => {
  const response = await api.post('/questions/ask/', {
    document_id: documentId,
    question,
  });
  
  return response.data;
};

export const fetchQuestionHistory = async (documentId) => {
  const response = await api.get(`/questions/${documentId}/history/`);
  return response.data;
};

export default api;
