from pydantic import BaseModel

# In questions.py
class QuestionRequest(BaseModel):
    document_id: int
    question_text: str  # Make sure these match your frontend

@router.post("/ask/")
async def ask_question(question_data: QuestionRequest, db: Session = Depends(get_db)):
    # Processing logic...

