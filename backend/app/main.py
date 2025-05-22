from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints import documents, questions
from app.db.database import init_db
from app.core.config import settings
from app.api.endpoints import documents, questions

# REMOVED: from pydantic_settings import BaseSettings - Not needed here

app = FastAPI(title=settings.PROJECT_NAME)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development - restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
def startup_event():
    init_db()

# Register routers
app.include_router(
    documents.router, 
    prefix=f"{settings.API_V1_STR}/documents", 
    tags=["documents"]
)
app.include_router(
    questions.router, 
    prefix=f"{settings.API_V1_STR}/questions", 
    tags=["questions"]
)


@app.get("/")
def read_root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}"}

