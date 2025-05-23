// src/services/api.js
import axios from 'axios';

const YOUR_VERIFIED_CLOUDRUN_BACKEND_URL = 'https://fastapi-ai-service-272733104980.asia-south1.run.app/';

const API_URL = process.env.NEXT_PUBLIC_API_URL || YOUR_VERIFIED_CLOUDRUN_BACKEND_URL;

console.log('Attempting to read NEXT_PUBLIC_API_URL from Vercel env:', process.env.NEXT_PUBLIC_API_URL);
console.log('API Service will use this API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
});

// 5. Example of uploadFile using the configured 'api' instance
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  

  const UPLOAD_PATH = '/api/v1/documents/upload/'; // Adjust if your backend has a prefix like /api/v1

  console.log(`Uploading file via api instance to: <span class="math-inline">\{API\_URL\}</span>{UPLOAD_PATH}`); // Use API_URL for full path log
  
  try {
    const response = await api.post(UPLOAD_PATH, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in uploadFile calling <span class="math-inline">\{API\_URL\}</span>{UPLOAD_PATH}:`, error.response || error.message || error);
    throw error;
  }
};

// Your other API functions (ensure paths are correct, e.g., /api/v1/documents/)
export const fetchDocuments = async () => {
  const response = await api.get('/api/v1/documents/'); 
  return response.data;
};

export const askQuestion = async (documentId, question) => {
  const response = await api.post('/api/v1/questions/ask/', { 
    document_id: documentId,
    question,
  });
  return response.data;
};

export const fetchQuestionHistory = async (documentId) => {
  const response = await api.get(`/api/v1/questions/${documentId}/history/`);
  return response.data;
};

export default api;