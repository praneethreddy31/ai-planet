from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import Document
from app.services.document_processor import process_pdf

router = APIRouter()

@router.post("/upload")
async def upload_document(file: UploadFile, db: Session = Depends(get_db)):
    # Rest of your code

   
    """Upload and process a PDF document"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Read and process the PDF
    file_content = await file.read()
    result = process_pdf(file_content)
    
    if not result["success"]:
        raise HTTPException(status_code=400, detail=f"Error processing PDF: {result['error']}")
    
    # Store in database
    new_document = Document(
        title=file.filename,
        content=result["text"]
    )
    
    db.add(new_document)
    db.commit()
    db.refresh(new_document)
    
    return {
        "message": "Document uploaded successfully",
        "document_id": new_document.id,
        "document_title": new_document.title
    }

@router.get("/")
def get_all_documents(db: Session = Depends(get_db)):
    """Get all uploaded documents"""
    documents = db.query(Document).all()
    return {
        "documents": [
            {"id": doc.id, "title": doc.title, "created_at": doc.created_at} 
            for doc in documents
        ]
    }

@router.get("/{document_id}")
def get_document(document_id: int, db: Session = Depends(get_db)):
    """Get a specific document by ID"""
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    return {
        "id": document.id,
        "title": document.title,
        "created_at": document.created_at
    }

def get_question_history(document_id: int, db: Session = Depends(get_db)):
    """Get question history for a specific document"""
    # First verify document exists
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Get questions for this document
    questions = db.query(Question).filter(
        Question.document_id == document_id
    ).order_by(Question.created_at.desc()).all()
    
    return {
        "questions": [
            {
                "id": q.id,
                "text": q.text,
                "answer": q.answer,
                "created_at": q.created_at
            } for q in questions
        ]
    }


