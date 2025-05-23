# In a new file: app/api/endpoints/questions.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from db.database import get_db
from db.models import Document, Question
from services.ai_service import answer_question

router = APIRouter()

class QuestionRequest(BaseModel):
    document_id: int
    question_text: str

@router.post("/ask/")
async def ask_question(question_data: QuestionRequest, db: Session = Depends(get_db)):
    try:
        # Get document
        document = db.query(Document).filter(Document.id == question_data.document_id).first()
        if not document:
            raise HTTPException(status_code=404, detail="Document not found")
        
        # Generate answer with detailed logging
        print(f"Sending question to AI service: {question_data.question_text[:50]}...")
        result = answer_question(document.content, question_data.question_text)
        print(f"AI service response success: {result['success']}")
        
        if not result["success"]:
            print(f"AI error: {result['error']}")
            raise HTTPException(status_code=500, detail=f"Error generating answer: {result['error']}")
        
        # Store in database with error handling
        try:
            new_question = Question(
                text=question_data.question_text,
                answer=result["answer"],
                document_id=question_data.document_id
            )
            db.add(new_question)
            db.commit()
            db.refresh(new_question)
        except Exception as db_error:
            print(f"Database error: {str(db_error)}")
            # Return answer even if saving fails
            return {
                "question": question_data.question_text,
                "answer": result["answer"],
                "error": "Answer generated but not saved to history"
            }
        
        return {
            "question_id": new_question.id,
            "question": question_data.question_text,
            "answer": result["answer"],
            "created_at": new_question.created_at
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error in ask_question: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")
@router.get("/test-ai/")
async def test_ai():
    """Test endpoint for AI service only"""
    try:
        result = answer_question("This is a test document content.", "What is this document about?")
        return {
            "success": result["success"],
            "answer": result.get("answer", ""),
            "error": result.get("error", "")
        }
    except Exception as e:
        return {"error": str(e)}
