// src/services/api.js
import axios from 'axios';

// PASTE YOUR CORRECT AND VERIFIED CLOUD RUN URL FROM STEP 1 HERE:
const CORRECT_AND_CURRENT_CLOUDRUN_URL = 'https://fastapi-ai-service-272733104980.asia-south1.run.app/';

const API_URL = process.env.NEXT_PUBLIC_API_URL || CORRECT_AND_CURRENT_CLOUDRUN_URL;

// For debugging - check this in your browser console
console.log('Build-time NEXT_PUBLIC_API_URL value:', process.env.NEXT_PUBLIC_API_URL);console.log('Final API_URL being used by service:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  // headers: { 'Content-Type': 'application/json', }, // Axios sets this by default for POST with object
});

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  // Ensure this endpoint path is correct, e.g., '/api/v1/documents/upload/' if you have a prefix
  const UPLOAD_PATH = '/documents/upload/'; // Or your actual upload path
  console.log(`Attempting to upload to: ${API_URL}${UPLOAD_PATH}`);

  try {
    // Use the 'api' instance if it has the baseURL set correctly, or construct full URL
    const response = await api.post(UPLOAD_PATH, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in uploadFile calling ${API_URL}${UPLOAD_PATH}:`, error.response || error.message || error);
    throw error;
  }
};

// Make sure other functions also use correct relative paths if using the 'api' instance
export const fetchDocuments = async () => {
  // e.g. if your backend route is /api/v1/documents/
  const response = await api.get('/api/v1/documents/'); 
  return response.data;
};

export const askQuestion = async (documentId, question) => {
  // e.g. if your backend route is /api/v1/questions/ask/
  const response = await api.post('/api/v1/questions/ask/', { 
    document_id: documentId,
    question,
  });

  return response.data;
};

export const fetchQuestionHistory = async (documentId) => {
  // e.g. if your backend route is /api/v1/questions/{documentId}/history/
  const response = await api.get(`/api/v1/questions/${documentId}/history/`);
  return response.data;
};



export default api;