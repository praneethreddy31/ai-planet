import os
import google.generativeai as genai

# Load API key from environment
API_KEY = os.getenv("GOOGLE_API_KEY")

# Initialize the API
genai.configure(api_key=API_KEY)

def answer_question(document_content, question_text):
    try:
        # Use Gemini 1.5 Flash - better for free tier quotas
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Or try an even lighter model:
        # model = genai.GenerativeModel('gemini-1.5-flash-8b')
        
        # Format the prompt but keep it concise to reduce tokens
        prompt = f"""
        Answer based on this document content.
        Document: {document_content[:5000]}  # Limiting document size
        Question: {question_text}
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
