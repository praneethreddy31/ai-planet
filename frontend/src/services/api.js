// src/services/api.js
import axios from 'axios';

// const API_VERSION_PREFIX = '/api'; // Not directly used if API_URL is constructed fully
// const BASE_HOST_URL = 'https://fastapi-ai-service-272733104980.asia-south1.run.app'; // Not directly used

// Corrected API_URL construction:
const API_URL = 'https://fastapi-ai-service-272733104980.asia-south1.run.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Now your paths will be relative to https://.../api
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
  // Corrected template literal for the path if documentId can have special characters,
  // though for a simple ID, it's often not an issue.
  // The original /questions/${documentId}/history/ is fine.
  // The "no-useless-escape" warnings you saw were likely if you had something like:
  // const somePath = `\/questions\/\$\{documentId\}\/history\/`; which is not what I wrote.
  // My previous example was: `/questions/${documentId}/history/`
  // If your line 7 was different, please share that specific line.

  // Assuming your line 7 was like this, which is standard:
  const response = await api.get(`/questions/${documentId}/history/`);
  return response.data;
};

export default api;