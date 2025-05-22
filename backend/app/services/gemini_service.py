import google.generativeai as genai
from typing import Dict, Any

from app.core.config import settings

# Configure the API
genai.configure(api_key=settings.GOOGLE_API_KEY)
   
def answer_question(document_content: str, question: str) -> Dict[str, Any]:
    """Generate an answer using Gemini based on document content"""
    try:
        # Initialize the model
        model = genai.GenerativeModel('gemini-pro')
        
        # Construct the prompt
        prompt = f"""
        Document content:
        {document_content}
        
        Answer the following question based only on the above document:
        Question: {question}
        """
        
        # Generate response
        response = model.generate_content(prompt)
        
        return {
            "answer": response.text,
            "success": True
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
