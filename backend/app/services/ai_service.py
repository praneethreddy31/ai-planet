# app/services/ai_service.py
import os
import google.generativeai as genai

# Load API key from environment
API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize the API
genai.configure(api_key=API_KEY)

def answer_question(document_content, question_text):
    try:
        # Use simple model configuration (no project ID needed)
        model = genai.GenerativeModel('gemini-1.5-pro')
        
        # Format the prompt
        prompt = f"""
        Based on the following document, please answer the question.
        
        DOCUMENT:
        {document_content}
        
        QUESTION:
        {question_text}
        
        ANSWER:
        """
        
        # Generate response
        response = model.generate_content(prompt)
        
        # Return successful response
        return {
            "success": True,
            "answer": response.text
        }
    except Exception as e:
        # Log the specific error
        print(f"AI service error: {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }
